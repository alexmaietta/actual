import { Trans } from 'react-i18next';

import { Text } from '@actual-app/components/text';
import { theme } from '@actual-app/components/theme';
import { View } from '@actual-app/components/view';
import { q } from '@actual-app/core/shared/query';
import { amountToInteger } from '@actual-app/core/shared/util';
import type {
  AccountEntity,
  HoldingEntity,
} from '@actual-app/core/types/models';

import { makeAmountFullStyle } from '#components/budget/util';
import { FinancialText } from '#components/FinancialText';
import { PrivacyFilter } from '#components/PrivacyFilter';
import { useFormat } from '#hooks/useFormat';
import { useQuery } from '#hooks/useQuery';

type HoldingsProps = {
  accountId?: AccountEntity['id'] | 'onbudget' | 'offbudget' | 'uncategorized';
};

const cellStyle = {
  padding: '4px 8px',
};

const SPECIAL_ACCOUNT_IDS = new Set(['onbudget', 'offbudget', 'uncategorized']);

export function Holdings({ accountId }: HoldingsProps) {
  const format = useFormat();
  const isRealAccount = accountId && !SPECIAL_ACCOUNT_IDS.has(accountId);
  const { data: holdings } = useQuery<HoldingEntity>(
    () =>
      isRealAccount
        ? q('holdings').filter({ account: accountId }).select('*')
        : null,
    [isRealAccount, accountId],
  );

  if (!holdings || holdings.length === 0) {
    return null;
  }

  const totalCostBasis = holdings.reduce(
    (sum, holding) => sum + (holding.cost_basis ?? 0),
    0,
  );
  const totalMarketValue = holdings.reduce(
    (sum, holding) => sum + (holding.market_value ?? 0),
    0,
  );
  const totalGainLoss = totalMarketValue - totalCostBasis;

  return (
    <View
      style={{
        flexShrink: 0,
        margin: '0 15px 10px',
        border: '1px solid ' + theme.tableBorder,
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: theme.tableHeaderBackground,
          color: theme.tableHeaderText,
          fontWeight: 500,
        }}
      >
        <Text style={{ ...cellStyle, flex: 2 }}>
          <Trans>Symbol</Trans>
        </Text>
        <Text style={{ ...cellStyle, flex: 4 }}>
          <Trans>Description</Trans>
        </Text>
        <Text style={{ ...cellStyle, flex: 2, textAlign: 'right' }}>
          <Trans>Shares</Trans>
        </Text>
        <Text style={{ ...cellStyle, flex: 2, textAlign: 'right' }}>
          <Trans>Cost basis</Trans>
        </Text>
        <Text style={{ ...cellStyle, flex: 2, textAlign: 'right' }}>
          <Trans>Market value</Trans>
        </Text>
        <Text style={{ ...cellStyle, flex: 2, textAlign: 'right' }}>
          <Trans>Gain/loss</Trans>
        </Text>
      </View>

      {holdings.map((holding, index) => {
        const marketValue = holding.market_value ?? 0;
        const costBasis = holding.cost_basis ?? 0;
        const gainLoss = marketValue - costBasis;

        return (
          <View
            key={holding.id}
            style={{
              flexDirection: 'row',
              color: theme.tableText,
              backgroundColor:
                index % 2 === 0
                  ? theme.tableBackground
                  : theme.tableRowBackgroundAlternate,
            }}
          >
            <Text style={{ ...cellStyle, flex: 2 }}>{holding.symbol}</Text>
            <Text style={{ ...cellStyle, flex: 4 }} title={holding.description}>
              {holding.description}
            </Text>
            <Text style={{ ...cellStyle, flex: 2, textAlign: 'right' }}>
              {holding.shares ?? ''}
            </Text>
            <Text style={{ ...cellStyle, flex: 2, textAlign: 'right' }}>
              <PrivacyFilter>
                <FinancialText>
                  {format(amountToInteger(costBasis), 'financial')}
                </FinancialText>
              </PrivacyFilter>
            </Text>
            <Text style={{ ...cellStyle, flex: 2, textAlign: 'right' }}>
              <PrivacyFilter>
                <FinancialText>
                  {format(amountToInteger(marketValue), 'financial')}
                </FinancialText>
              </PrivacyFilter>
            </Text>
            <Text style={{ ...cellStyle, flex: 2, textAlign: 'right' }}>
              <PrivacyFilter>
                <FinancialText style={makeAmountFullStyle(gainLoss)}>
                  {format(amountToInteger(gainLoss), 'financial-with-sign')}
                </FinancialText>
              </PrivacyFilter>
            </Text>
          </View>
        );
      })}

      <View
        style={{
          flexDirection: 'row',
          fontWeight: 600,
          color: theme.tableText,
          backgroundColor: theme.tableHeaderBackground,
          borderTop: '1px solid ' + theme.tableBorder,
        }}
      >
        <Text style={{ ...cellStyle, flex: 6 }}>
          <Trans>Total</Trans>
        </Text>
        <Text style={{ ...cellStyle, flex: 2, textAlign: 'right' }} />
        <Text style={{ ...cellStyle, flex: 2, textAlign: 'right' }}>
          <PrivacyFilter>
            <FinancialText>
              {format(amountToInteger(totalCostBasis), 'financial')}
            </FinancialText>
          </PrivacyFilter>
        </Text>
        <Text style={{ ...cellStyle, flex: 2, textAlign: 'right' }}>
          <PrivacyFilter>
            <FinancialText>
              {format(amountToInteger(totalMarketValue), 'financial')}
            </FinancialText>
          </PrivacyFilter>
        </Text>
        <Text style={{ ...cellStyle, flex: 2, textAlign: 'right' }}>
          <PrivacyFilter>
            <FinancialText style={makeAmountFullStyle(totalGainLoss)}>
              {format(amountToInteger(totalGainLoss), 'financial-with-sign')}
            </FinancialText>
          </PrivacyFilter>
        </Text>
      </View>
    </View>
  );
}
