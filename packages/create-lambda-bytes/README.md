# Create Lambda Bytes

## Requirements

- Docker

## Features

- This package aims to simplify the creation of bytes used during the governance rounds of the Mavryk Finance dApp
- Uses typescript to generate a ligo that it then compiles using docker
- Can be used globally or imported in a typescript file

## Installing

### Package manager

Using npm:
- Local installation

```bash
$ npm install @mavrykdynamics/create-lambda-bytes
```

- Global installation
```bash
$ npm install -g @mavrykdynamics/create-lambda-bytes
```

Using yarn:
- Local installation

```bash
$ yarn add @mavrykdynamics/create-lambda-bytes
```

- Global installation
```bash
$ yarn add global @mavrykdynamics/create-lambda-bytes
```

Once the package is installed locally, you can import the library using `import`:

```ts
import { createLambdaBytes } from '@mavrykdynamics/create-lambda-bytes';
```

## Example

- in a typescript file
```ts
import { createLambdaBytes } from '@mavrykdynamics/create-lambda-bytes';

// Update the delegation ratio in the delegation contract
let bytes   = await createLambdaBytes(
    'http://localhost:8732',
    'KT1Buw3qCBc89fmUpCEAEtT3dudyTvoZUGNg',
    
    'updateConfig',
    [
        'KT1NCztBiaMSHqJEKJAsk27k7NGs3cjSdoD7',
        'delegation',
        'ConfigDelegationRatio',
        80
    ]
);

// Create a farm
let bytes   = await createLambdaBytes(
    'http://localhost:8732',
    'KT1Buw3qCBc89fmUpCEAEtT3dudyTvoZUGNg',
    
    'createFarm',
    [
        'KT1SSKjACW8iz6UJ8b55vYSbEgxtWZeKtqP6',
        'aNewFarm',
        false,
        false,
        false,
        10000,
        100,
        Buffer.from(
            JSON.stringify({
            name: 'MAVRYK Farm',
            description: 'MAVRYK Farm Contract',
            version: 'v1.0.0',
            liquidityPairToken: {
                tokenAddress: ['KT18qSo4Ch2Mfq4jP3eME7SWHB8B8EDTtVBu'],
                origin: ['Plenty'],
                token0: {
                    symbol: ['PLENTY'],
                    tokenAddress: ['KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b']
                },
                token1: {
                    symbol: ['USDtz'],
                    tokenAddress: ['KT1LN4LPSqTMS7Sd2CJw4bbDGRkMv2t68Fy9']
                }
            },
            authors: ['MAVRYK Dev Team <contact@mavryk.finance>'],
            }),
            'ascii',
        ).toString('hex'),
        'KT1MD1hit3AnFq3QTDpJpBPTkzj26KpwKSaN',
        0,
        `"FA2"
    ]
);
```

- globally from the terminal
```bash
# Update the delegation ratio in the delegation contract
create-lambda-bytes http://localhost:8732 KT1Buw3qCBc89fmUpCEAEtT3dudyTvoZUGNg updateConfig KT1NCztBiaMSHqJEKJAsk27k7NGs3cjSdoD7 delegation ConfigDelegationRatio 80

# Create a farm
create-lambda-bytes http://localhost:8732 KT1Buw3qCBc89fmUpCEAEtT3dudyTvoZUGNg createFarm KT1SSKjACW8iz6UJ8b55vYSbEgxtWZeKtqP6 aNewFarm false false false 10000 100 7b226e616d65223a224d415652594b204661726d222c226465736372697074696f6e223a224d415652594b204661726d20436f6e7472616374222c2276657273696f6e223a2276312e302e30222c226c697175696469747950616972546f6b656e223a7b22746f6b656e41646472657373223a5b224b54313871536f344368324d6671346a5033654d45375357484238423845445474564275225d2c226f726967696e223a5b22506c656e7479225d2c22746f6b656e30223a7b2273796d626f6c223a5b22504c454e5459225d2c22746f6b656e41646472657373223a5b224b5431475253764c6f696b447358756a4b675a5073474c58386b38567652325471393562225d7d2c22746f6b656e31223a7b2273796d626f6c223a5b22555344747a225d2c22746f6b656e41646472657373223a5b224b54314c4e344c505371544d5337536432434a773462624447526b4d7632743638467939225d7d7d2c22617574686f7273223a5b224d415652594b20446576205465616d203c636f6e74616374406d617672796b2e66696e616e63653e225d7d KT1MD1hit3AnFq3QTDpJpBPTkzj26KpwKSaN 0 FA2 
```
## API

### Required parameters

The first two parameters of each call to createLambdaQuery are common for each lambda functions and need to be added for every call:

- local:
```ts 
await createLambdaBytes(
  RPC_URL,
  GOVERNANCE_PROXY_CONTRACT_ADDRESS,
  ...)
```

- global:
```bash
create-lambda-bytes RPC_URL GOVERNANCE_PROXY_CONTRACT_ADDRESS
```

1. RPC_URL: The RPC URL of the node you want to connect to (no matter the network)
2. GOVERNANCE_PROXY_CONTRACT_ADDRESS: The address of the governance proxy contract deployed on the network ran by the node of step 1.

### Using the package

#### Building the function call
List of all lambda function and their required parameters. To create the bytes for one of them, you need to:
1. Add the name of the function you are choosing as the call third parameter
  Example:
  - local:
    ```ts 
    await createLambdaBytes(
      RPC_URL,
      GOVERNANCE_PROXY_CONTRACT_ADDRESS,
      LAMBDA_FUNCTION_NAME
      ...)
    ```
  - global:
    ```bash
    create-lambda-bytes RPC_URL GOVERNANCE_PROXY_CONTRACT_ADDRESS LAMBDA_FUNCTION_NAME
    ```
2. Add the parameters related to the lambda function to the function call
  Example:
  - local:
    ```ts 
    await createLambdaBytes(
      RPC_URL,
      GOVERNANCE_PROXY_CONTRACT_ADDRESS,
      LAMBDA_FUNCTION_NAME,
      PARAMETER_1,
      PARAMETER_2,
      PARAMETER_3,
      ...)
    ```
  - global:
    ```bash
    create-lambda-bytes RPC_URL GOVERNANCE_PROXY_CONTRACT_ADDRESS LAMBDA_FUNCTION_NAME PARAMETER_1 PARAMETER_2 PARAMETER_3
    ```

#### Lambda functions API

## setAdmin

**Description:**

Sets the admin of the target contract.

**Parameters:**

  * `targetContract`: The address of the target contract.
  * `newAdminAddress`: The address of the new admin.

## setGovernance

**Description:**

Sets the governance of the target contract.

**Parameters:**

  * `targetContract`: The address of the target contract.
  * `newGovernanceAddress`: The address of the new governance.

## setName

**Description:**

Sets the name of the target contract.

**Parameters:**

  * `targetContract`: The address of the target contract.
  * `newName`: The new name of the contract.

## setLambda

**Description:**

Sets the lambda of the target contract.

**Parameters:**

  * `targetContract`: The address of the target contract.
  * `lambdaName`: The name of the lambda.
  * `lambdaBytes`: The bytes of the lambda.

## setProductLambda

**Description:**

Sets the product lambda of the target contract.

**Parameters:**

  * `targetContract`: The address of the target contract.
  * `lambdaName`: The name of the lambda.
  * `lambdaBytes`: The bytes of the lambda.

## updateMetadata

**Description:**

Updates the metadata of the target contract.

**Parameters:**

  * `targetContract`: The address of the target contract.
  * `metadataKey`: The key of the metadata to update.
  * `metadataHash`: The hash of the new metadata value.

## updateWhitelistContracts

**Description:**

Updates the whitelisted contracts map for the target contract.

**Parameters:**

  * `targetContract`: The address of the target contract.
  * `whitelistContractName`: The name of the contract to add or remove from the whitelist.
  * `whitelistContractAddress`: The address of the contract to add or remove from the whitelist.
  * `updateType`: The type of update to perform: `"Update"` to add the contract to the whitelist, or `"Remove"` to remove the contract from the whitelist.

## updateGeneralContracts

**Description:**

Updates the general contracts map for the target contract.

**Parameters:**

  * `targetContract`: The address of the target contract.
  * `generalContractName`: The name of the contract to add or remove from the general contracts map.
  * `generalContractAddress`: The address of the contract to add or remove from the general contracts map.
  * `updateType`: The type of update to perform: `"Update"` to add the contract to the general contracts list, or `"Remove"` to remove the contract from the general contracts list.

## updateWhitelistTokenContracts

**Description:**

Updates the whitelist token contracts map for the target contract.

**Parameters:**

  * `targetContract`: The address of the target contract.
  * `tokenContractName`: The name of the token contract to add or remove from the whitelist.
  * `tokenContractAddress`: The address of the contract to add or remove from the general contracts map.
  * `updateType`: The type of update to perform: `"Update"` to add the token contract to the whitelist, or `"Remove"` to remove the token contract from the whitelist.

## updateConfig

**Description:**

Updates the configuration of the target contract.

**Parameters:**

  * `targetContract`: The address of the target contract.
  * `targetContractType`: The type of the target contract: `"aggregator"`, `"aggregatorFactory"`, `"breakGlass"`, `"council"`, `"delegation"`, `"doorman"`, `"emergencyGovernance"`, `"farm"`, `"farmFactory"`, `"governance"`, `"governanceFinancial"`, `"governanceSatellite"`, `"lendingController"`, `"treasuryFactory"` or `"vaultFactory"`
  * `updateConfigAction`: The configuration to update depending on the value set as `targetContractType`:
    * `"aggregator"`:
      * `"ConfigDecimals"`:
      * `"ConfigAlphaPercentPerThousand"`:
      * `"ConfigPercentOracleThreshold"`:
      * `"ConfigHeartBeatSeconds"`:
      * `"ConfigRewardAmountStakedMvk"`:
      * `"ConfigRewardAmountXtz"`:
    * `"aggregatorFactory"`:
      * `"ConfigAggregatorNameMaxLength"`:
    * `"breakGlass"`:
      * `"ConfigThreshold"`:
      * `"ConfigActionExpiryDays"`:
      * `"ConfigCouncilNameMaxLength"`:
      * `"ConfigCouncilWebsiteMaxLength"`:
      * `"ConfigCouncilImageMaxLength"`:
    * `"council"`:
      * `"ConfigThreshold"`:
      * `"ConfigActionExpiryDays"`:
      * `"ConfigCouncilNameMaxLength"`:
      * `"ConfigCouncilWebsiteMaxLength"`:
      * `"ConfigCouncilImageMaxLength"`:
      * `"ConfigRequestTokenNameMaxLength"`:
      * `"ConfigRequestPurposeMaxLength"`:
    * `"delegation"`:
      * `"ConfigMinimumStakedMvkBalance"`:
      * `"ConfigDelegationRatio"`:
      * `"ConfigMaxSatellites"`:
      * `"ConfigSatNameMaxLength"`:
      * `"ConfigSatDescMaxLength"`:
      * `"ConfigSatImageMaxLength"`:
      * `"ConfigSatWebsiteMaxLength"`:
    * `"doorman"`:
      * `"ConfigMinMvkAmount"`
    * `"emergencyGovernance"`:
      * `"ConfigVoteExpiryDays"`:
      * `"ConfigRequiredFeeMutez"`:
      * `"ConfigStakedMvkPercentRequired"`:
      * `"ConfigMinStakedMvkForVoting"`:
      * `"ConfigMinStakedMvkForTrigger"`:
      * `"ConfigProposalTitleMaxLength"`:
      * `"ConfigProposalDescMaxLength"`:
    * `"farm"`:
      * `"ConfigForceRewardFromTransfer"`:
      * `"ConfigRewardPerBlock"`:
    * `"farmFactory"`:
      * `"ConfigFarmNameMaxLength"`:
    * `"governance"`:
      * `"ConfigSuccessReward"`:
      * `"ConfigCycleVotersReward"`:
      * `"ConfigMinProposalRoundVotePct"`:
      * `"ConfigMinProposalRoundVotesReq"`:
      * `"ConfigMinQuorumPercentage"`:
      * `"ConfigMinYayVotePercentage"`:
      * `"ConfigProposeFeeMutez"`:
      * `"ConfigMaxProposalsPerSatellite"`:
      * `"ConfigBlocksPerProposalRound"`:
      * `"ConfigBlocksPerVotingRound"`:
      * `"ConfigBlocksPerTimelockRound"`:
      * `"ConfigProposalDatTitleMaxLength"`:
      * `"ConfigProposalTitleMaxLength"`:
      * `"ConfigProposalDescMaxLength"`:
      * `"ConfigProposalInvoiceMaxLength"`:
      * `"ConfigProposalCodeMaxLength"`:
    * `"governanceFinancial"`:
      * `"ConfigFinancialReqApprovalPct"`:
      * `"ConfigFinancialReqDurationDays"`:
    * `"governanceSatellite"`:
      * `"ConfigApprovalPercentage"`:
      * `"ConfigSatelliteDurationInDays"`:
      * `"ConfigPurposeMaxLength"`:
      * `"ConfigMaxActionsPerSatellite"`:
    * `"lendingController"`:
      * `"ConfigCollateralRatio"`:
      * `"ConfigLiquidationRatio"`:
      * `"ConfigLiquidationFeePercent"`:
      * `"ConfigAdminLiquidationFee"`:
      * `"ConfigMinimumLoanFeePercent"`:
      * `"ConfigMinLoanFeeTreasuryShare"`:
      * `"ConfigInterestTreasuryShare"`:
      * `"ConfigMockLevel"`:
    * `"treasuryFactory"`:
      * `"ConfigTreasuryNameMaxLength"`:
    * `"vaultFactory"`:
      * `"ConfigVaultNameMaxLength"`:
  * `updateConfigNewValue`: The new value of the configuration.

## pauseAll

**Description:**

Pauses all entrypoints on the target contract.

**Parameters:**

  * `targetContract`: The address of the target contract.

## unpauseAll

**Description:**

Unpauses all entrypoints on the target contract.

**Parameters:**

  * `targetContract`: The address of the target contract.

## togglePauseEntrypoint

**Description:**

Toggles the pause state of the specified entrypoint on the target contract.

**Parameters:**

  * `targetContract`: The address of the target contract.
  * `targetContractType`: The type of the target contract:  `"aggregator"`, `"aggregatorFactory"`, `"delegation"`, `"doorman"`, `"farm"`, `"farmFactory"`, `"lendingController"`, `"treasury"`, `"treasuryFactory"` or `"vaultFactory"`
  * `targetEntrypoint`: The name of the entrypoint to toggle depending on the value set as `targetContractType`:
    * `"aggregator"`:
      * `"UpdateData"`
    	* `"WithdrawRewardXtz"`
    	* `"WithdrawRewardStakedMvk"`
		*`"aggregatorFactory"`:
      * `"CreateAggregator"`
    	* `"UntrackAggregator"`
    	* `"TrackAggregator"`
    	* `"DistributeRewardXtz"`
    	* `"DistributeRewardStakedMvk"`
		*`"delegation"`:
      * `"DelegateToSatellite"`
    	* `"UndelegateFromSatellite"`
    	* `"RegisterAsSatellite"`
    	* `"UnregisterAsSatellite"`
    	* `"UpdateSatelliteRecord"`
    	* `"DistributeReward"`
		*`"doorman"`:
      * `"Stake"`
    	* `"Unstake"`
    	* `"Compound"`
    	* `"FarmClaim"`
    	* `"OnVaultDepositStake"`
    	* `"OnVaultWithdrawStake"`
    	* `"OnVaultLiquidateStake"`
		*`"farm"`:
      * `"Deposit"`
    	* `"Withdraw"`
    	* `"Claim"`
		*`"farmFactory"`:
      * `"CreateFarm"`
    	* `"CreateFarmMToken"`
    	* `"UntrackFarm"`
    	* `"TrackFarm"`
		*`"lendingController"`:
    	* `"SetLoanToken"`
    	* `"SetCollateralToken"`
    	* `"AddLiquidity"`
    	* `"RemoveLiquidity"`
    	* `"RegisterVaultCreation"`
    	* `"CloseVault"`
    	* `"RegisterDeposit"`
    	* `"RegisterWithdrawal"`
    	* `"MarkForLiquidation"`
    	* `"LiquidateVault"`
    	* `"Borrow"`
    	* `"Repay"`
    	* `"VaultDeposit"`
    	* `"VaultWithdraw"`
    	* `"VaultOnLiquidate"`
    	* `"VaultDepositStakedToken"`
    	* `"VaultWithdrawStakedToken"`
		*`"treasury"`:
      * `"Transfer"`
    	* `"MintMvkAndTransfer"`
    	* `"StakeMvk"`
    	* `"UnstakeMvk"`
		*`"treasuryFactory"`:
      * `"CreateTreasury"`
    	* `"TrackTreasury"`
    	* `"UntrackTreasury"`
		*`"vaultFactory"`:
    	* `"CreateVault"`
  * `pause`: The new pause state of the entrypoint.

## updateWhitelistDevelopers

**Description:**

Updates the list of whitelist developer for the target contract.

**Parameters:**

  * `targetContract`: The address of the target contract.
  * `whitelistedDeveloperAddress`: The address of the developer to add or remove from the whitelist depending if the developer is already in the list or not.

## setGovernanceProxy

**Description:**

Sets the governance proxy for the target contract.

**Parameters:**

  * `targetContract`: The address of the target contract.
  * `governanceProxyAddress`: The address of the governance proxy.

## createFarm

**Description:**

Creates a new farm.

**Parameters:**

  * `targetContract`: The address of the farm factory contract.
  * `farmName`: The name of the farm.
  * `addToGeneralContracts`: Whether to add the farm to the map of general contracts of the Governance contract.
  * `forceRewardFromTransfer`: Whether to force rewards to be transferred to the farm from a treasury instead of being minted.
  * `infinite`: Whether the farm has an infinite duration.
  * `totalBlocks`: The total number of blocks in the farm.
  * `currentRewardPerBlock`: The current reward per block in SMVK.
  * `metadata`: The metadata for the farm contract in bytes.
  * `lpTokenAddress`: The address of the liquidity pool token.
  * `lpTokenId`: The token id of the liquidity pool token if the token is FA2.
  * `lpTokenStandard`: The standard of the liquidity pool token: `"fa12"` or `"fa2"`.

## createFarmMToken

**Description:**

Creates a new farm using a MToken as a LPToken.

**Parameters:**

  * `targetContract`: The address of the farm factory contract.
  * `farmName`: The name of the farm.
  * `loanToken`: The loan token name in the Lending Controller contract.
  * `addToGeneralContracts`: Whether to add the farm to the map of general contracts of the Governance contract.
  * `forceRewardFromTransfer`: Whether to force rewards to be transferred to the farm from a treasury instead of being minted.
  * `infinite`: Whether the farm has an infinite duration.
  * `totalBlocks`: The total number of blocks in the farm.
  * `currentRewardPerBlock`: The current reward per block in SMVK.
  * `metadata`: The metadata for the farm contract in bytes.
  * `lpTokenAddress`: The address of the liquidity pool token.
  * `lpTokenId`: The token id of the liquidity pool token if the token is FA2.
  * `lpTokenStandard`: The standard of the liquidity pool token: `"fa12"` or `"fa2"`.

## initFarm

**Description:**

Initializes a farm contract that was originated without its factory.

**Parameters:**

  * `targetContract`: The address of the farm contract.
  * `totalBlocks`: The total number of blocks in the farm.
  * `currentRewardPerBlock`: The current reward per block in SMVK.
  * `forceRewardFromTransfer`: Whether to force rewards to be transferred to the farm instead of being minted.
  * `infinite`: Whether the farm has an infinite duration.

## closeFarm

**Description:**

Closes a farm.

**Parameters:**

  * `targetContract`: The address of the farm contract to close.

## createTreasury

**Description:**

Creates a new treasury.

**Parameters:**

  * `targetContract`: The address of the treasury factory contract.
  * `baker` (optional): The baker key hash if the treasury should delegate its token.
  * `treasuryName`: The name of the treasury.
  * `addToGeneralContracts`: Whether to add the treasury to the map of general contracts of the Governance contract.
  * `metadata`: The metadata for the treasury.

## transfer

**Description:**

Transfers tokens from one treasury to an account.

**Parameters:**

  * `targetContract`: The address of the treasury contract to transfer tokens from.
  * `transfers`: An array of transfer instructions:
    * fa12 token transfers:
    ```ts
    {
      to_: string;
      amount: number;
      token: {
        fa12: string;
      }
    }
    ```
      * to_: receiver address
      * amount: token amount to send
      * fa12: token contract address
    * fa2 token transfers:
    ```ts
    {
      to_: string;
      amount: number;
      token: {
        fa2: {
            tokenContractAddress: string;
            tokenId: number;
        }
      }
    }
    ```
      * to_: receiver address
      * amount: token amount to send
      * tokenContractAddress: token contract address
      * tokenId: token id
    * tez transfers:
    ```ts
    {
      to_: string;
      amount: number;
      token: "tez"
    }
    ```
      * to_: receiver address
      * amount: token amount to send

## mintMvkAndTransfer

**Description:**

Mints mvk and transfers it to an address.

**Parameters:**

  * `targetContract`: The address of the contract to mint mvk and transfer from.
  * `to_`: The address to transfer the mvk to.
  * `amount`: The amount of mvk to mint and transfer.

## updateMvkOperators

**Description:**

Updates the mvk operators for an address.

**Parameters:**

  * `targetContract`: The address of the contract to update mvk operators on.
  * `operators`: An array of operators to update:
    * addOperator:
      ```ts
      addOperator: {
          owner: string,
          operator: string,
          tokenId: number
      }
      ```
      * owner: owner address
      * operator: operator address
      * tokenId: token id
    * removeOperator:
      ```ts
      removeOperator: {
          owner: string,
          operator: string,
          tokenId: number
      }
      ```
      * owner: owner address
      * operator: operator address
      * tokenId: token id

## stakeMvk

**Description:**

Stakes mvk held by a treasury.

**Parameters:**

  * `targetContract`: The address of the contract to stake mvk on.
  * `amount`: The amount of mvk to stake.

## unstakeMvk

**Description:**

Unstakes mvk to a treasury.

**Parameters:**

  * `targetContract`: The address of the contract to unstake mvk on.
  * `amount`: The amount of mvk to unstake.

## createAggregator

**Description:**

Creates a new aggregator contract.

**Parameters:**

  * `targetContract`: The address of the aggregator factory contract.
  * `aggregatorName`: The name of the aggregator.
  * `addToGeneralContracts`: Whether to add the aggregator to the general contracts map of the Governance contract.
  * `oraclesInformation`: An array of objects that contain information about the oracles that will be used by the aggregator:
    ```ts
    {
      oracleAddress           : string,
      oraclePublicKey         : string,
      oraclePeerId            : string
    }
    ```
  * `decimals`: The number of decimals to use for the aggregator's price.
  * `alphaPercentPerThousand`: The alpha percentage per thousand.
  * `percentOracleThreshold`: The percent oracle threshold.
  * `heartBeatSeconds`: The heartbeat seconds.
  * `rewardAmountStakedMvk`: The reward amount in SMVK.
  * `rewardAmountXtz`: The reward amount in XTZ.
  * `metadata`: The metadata for the aggregator.

## updateInflationRate

**Description:**

Updates the inflation rate for the target contract.

**Parameters:**

  * `targetContract`: The address of the contract that will be used to update the inflation rate.
  * `inflationRate`: The new inflation rate.

## triggerInflation

Triggers inflation for the target contract.

**Parameters:**

  * `targetContract`: The address of the contract that will   be used to trigger inflation.

## trackProductContract

**Description:**

Tracks a product contract.

**Parameters:**

  * `targetContract`: The address of the contract that will be used to track the product contract.
  * `productContractType`: The type of product contract: `"aggregator"`, `"farm"` or `"treasury"`
  * `productContractAddress`: The address of the product contract.

## untrackProductContract

**Description:**

Untracks a product contract.

**Parameters:**

  * `targetContract`: The address of the contract that will be used to untrack the product contract.
  * `productContractType`: The type of product contract: `"aggregator"`, `"farm"` or `"treasury"`
  * `productContractAddress`: The address of the product contract.

## addVestee

**Description:**

Adds a vestee to the target contract.

**Parameters:**

  * `targetContract`: The address of the contract that will be used to add the vestee.
  * `vesteeAddress`: The address of the vestee.
  * `totalAllocatedAmount`: The total amount of tokens to be allocated to the vestee.
  * `cliffInMonths`: The number of months before the vestee can start vesting.
  * `vestingInMonths`: The number of months over which the vestee will vest.

## removeVestee

**Description:**

Removes a vestee from the target contract.

**Parameters:**

  * `targetContract`: The address of the contract that will be used to remove the vestee.
  * `vesteeAddress`: The address of the vestee.

## updateVestee

**Description:**

Updates the information about a vestee in the target contract.

**Parameters:**

  * `targetContract`: The address of the contract that will be used to update the vestee.
  * `vesteeAddress`: The address of the vestee.
  * `newTotalAllocatedAmount`: The new total amount of tokens to be allocated to the vestee.
  * `newCliffInMonths`: The new number of months before the vestee can start vesting.
  * `newVestingInMonths`: The new number of months over which the vestee will vest.

## toggleVesteeLock

**Description:**

Toggles the lock status of a vestee in the target contract.

**Parameters:**

  * `targetContract`: The address of the contract that will be used to toggle the lock status.
  * `vesteeAddress`: The address of the vestee.

# setLoanToken

**Description:**

Creates or updates a loan token in the target contract.

**Parameters:**

  * `targetContract`: The address of the contract that will be used to create or update the loan token.
  * `setLoanTokenAction`: The action to perform. Can be either `createLoanToken` or `updateLoanToken`:
    * createLoanToken:
    ```ts
    {
      createLoanToken: {
        tokenName: string;
        tokenDecimals: number;
        oracleAddress: string;
        mTokenAddress: string;
        reserveRatio: number;
        optimalUtilisationRate: number;
        baseInterestRate: number;
        maxInterestRate: number;
        interestRateBelowOptimalUtilisation: number;
        interestRateAboveOptimalUtilisation: number;
        minRepaymentAmount: number;
        tokenType: fa12 |    fa2 | "tez"; 
      }
    } 
    ```
    * `tokenName`: The name of the loan token.
    * `tokenDecimals`: The number of decimals to use for the loan token.
    * `oracleAddress`: The address of the oracle that will be used to price the loan token.
    * `mTokenAddress`: The address of the mToken that will be used for the loan token.
    * `reserveRatio`: The reserve ratio for the loan token.
    * `optimalUtilisationRate`: The optimal utilisation rate for the loan token.
    * `baseInterestRate`: The base interest rate for the loan token.
    * `maxInterestRate`: The maximum interest rate for the loan token.
    * `interestRateBelowOptimalUtilisation`: The interest rate below the optimal utilisation rate for the loan token.
    * `interestRateAboveOptimalUtilisation`: The interest rate above the optimal utilisation rate for the loan token.
    * `minRepaymentAmount`: The minimum repayment amount for the loan token.
    * `tokenType`: The type of token. Can be `"tez"`, `fa12`, or `fa2`:
      * fa12:
      ```ts
      {
        fa12: string;
      }
      ```
      * fa12: token contract address
      * fa2:
      ```ts
      {
        fa2: {
            tokenContractAddress: string;
            tokenId: number;
        }
      }
      ```
      * tokenContractAddress: token contract address
      * tokenId: token id
  * updateLoanToken:
    ```ts
    {
      updateLoanToken: {
        tokenName: string;
        oracleAddress: string;
        reserveRatio: number;
        optimalUtilisationRate: number;
        baseInterestRate: number;
        maxInterestRate: number;
        interestRateBelowOptimalUtilisation: number;
        interestRateAboveOptimalUtilisation: number;
        minRepaymentAmount: number;
        isPaused: boolean;
      }
    }
    ```
    * `tokenName`: The name of the loan token.
    * `oracleAddress`: The address of the oracle that will be used to price the loan token.
    * `reserveRatio`: The reserve ratio for the loan token.
    * `optimalUtilisationRate`: The optimal utilisation rate for the loan token.
    * `baseInterestRate`: The base interest rate for the loan token.
    * `maxInterestRate`: The maximum interest rate for the loan token.
    * `interestRateBelowOptimalUtilisation`: The interest rate below the optimal utilisation rate for the loan token.
    * `interestRateAboveOptimalUtilisation`: The interest rate above the optimal utilisation rate for the loan token.
    * `minRepaymentAmount`: The minimum repayment amount for the loan token.
    * `isPaused`: Whether to pause the loan token.

# setCollateralToken

**Description:**

Creates or updates a collateral token in the target contract.

**Parameters:**

  * `targetContract`: The address of the contract that will be used to create or update the collateral token.
  * `setCollateralTokenAction`: The action to perform. Can be either `createCollateralToken` or `updateCollateralToken`:
    * createCollateralToken:
      ```ts
      {
        createCollateralToken: {
          tokenName: string,
          tokenContractAddress: string,
          tokenDecimals: number,
          oracleAddress: string,
          protected: boolean,
          isScaledToken: boolean,
          isStakedToken: boolean,
          stakingContractAddress: string | undefined,
          maxDepositAmount: number | undefined,
          tokenType: fa12 | fa2 | "tez"
        }
      } 
      ```
      * `tokenName`: The name of the collateral token.
      * `tokenContractAddress`: The address of the contract that represents the collateral token.
      * `tokenDecimals`: The number of decimals to use for the collateral token.
      * `oracleAddress`: The address of the oracle that will be used to price the collateral token.
      * `protected`: Whether the collateral token is protected.
      * `isScaledToken`: Whether the collateral token is a scaled token.
      * `isStakedToken`: Whether the collateral token is a staked token.
      * `stakingContractAddress` (optional): The address of the contract that manages the staking of the collateral token.
      * `maxDepositAmount` (optional): The maximum amount of the collateral token that can be deposited.
      * `tokenType`: The type of token. Can be `"tez"`, `"fa12"`, or `"fa2"`:
        * fa12:
        ```ts
        {
          fa12: string;
        }
        ```
        * fa12: token contract address
        * fa2:
        ```ts
        {
          fa2: {
              tokenContractAddress: string;
              tokenId: number;
          }
        }
        ```
        * tokenContractAddress: token contract address
        * tokenId: token id
    * updateCollateralToken:
      ```ts
      {
        updateCollateralToken: {
          tokenName: string,
          oracleAddress: string,
          isPaused: boolean,
          stakingContractAddress: string | undefined,
          maxDepositAmount: number | undefined,
        }
      }
      ```
      * `tokenName`: The name of the collateral token.
      * `oracleAddress`: The address of the oracle that will be used to price the collateral token.
      * `isPaused`: Whether to pause the collateral token.
      * `stakingContractAddress` (optional): The address of the contract that manages the staking of the collateral token.
      * `maxDepositAmount` (optional): The maximum amount of the collateral token that can be deposited.

## License

[MIT](LICENSE)