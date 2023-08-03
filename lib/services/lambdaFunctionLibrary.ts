import { addOperator, createCollateralToken, createLoanToken, fa12, fa2, oracleInformation, removeOperator, transferItem, updateCollateralToken, updateLoanToken } from './lambdaFunctionInterfaces'

const proxyContract = (

    lambdaFunction: string

) => {
    return `// ------------------------------------------------------------------------------
// Types
// ------------------------------------------------------------------------------

type setLambdaType is [@layout:comb] record [
    name                  : string;
    func_bytes            : bytes;
]
type farmTypeType is 
        Farm    of unit
    |   MFarm   of unit
type setFarmLambdaType is [@layout:comb] record [
    name                  : string;
    func_bytes            : bytes;
    farmType              : farmTypeType;
]

type updateMetadataType is [@layout:comb] record [
    metadataKey      : string;
    metadataHash     : bytes; 
]

type updateType is 
    |   Update of unit
    |   Remove of unit

type updateWhitelistContractsType is [@layout:comb] record [
    whitelistContractAddress  : address;
    updateType                : updateType;
]

type updateGeneralContractsType is [@layout:comb] record [
    generalContractName     : string;
    generalContractAddress  : address;
    updateType              : updateType;
]

type updateWhitelistTokenContractsType is [@layout:comb] record [
    tokenContractAddress  : address;
    updateType            : updateType;
]

type aggregatorUpdateConfigActionType is 
        ConfigDecimals                      of unit
    |   ConfigAlphaPercentPerThousand       of unit

    |   ConfigPercentOracleThreshold        of unit
    |   ConfigHeartbeatSeconds              of unit

    |   ConfigRewardAmountStakedMvk         of unit
    |   ConfigRewardAmountXtz               of unit

type aggregatorUpdateConfigParamsType is [@layout:comb] record [
    updateConfigNewValue  : nat; 
    updateConfigAction    : aggregatorUpdateConfigActionType;
]

type aggregatorFactoryUpdateConfigActionType is 
    | ConfigAggregatorNameMaxLength   of unit
    | Empty                           of unit

type aggregatorFactoryUpdateConfigParamsType is [@layout:comb] record [
    updateConfigNewValue  : nat; 
    updateConfigAction    : aggregatorFactoryUpdateConfigActionType;
]

type breakGlassUpdateConfigActionType is 
        ConfigThreshold               of unit
    |   ConfigActionExpiryDays        of unit
    |   ConfigCouncilNameMaxLength    of unit
    |   ConfigCouncilWebsiteMaxLength of unit
    |   ConfigCouncilImageMaxLength   of unit

type breakGlassUpdateConfigParamsType is [@layout:comb] record [
    updateConfigNewValue  : nat; 
    updateConfigAction    : breakGlassUpdateConfigActionType;
]

type councilUpdateConfigActionType is 
        ConfigThreshold                       of unit
    |   ConfigActionExpiryDays                of unit
    |   ConfigCouncilNameMaxLength            of unit
    |   ConfigCouncilWebsiteMaxLength         of unit
    |   ConfigCouncilImageMaxLength           of unit
    |   ConfigRequestTokenNameMaxLength       of unit
    |   ConfigRequestPurposeMaxLength         of unit

type councilUpdateConfigParamsType is [@layout:comb] record [
    updateConfigNewValue        : nat; 
    updateConfigAction          : councilUpdateConfigActionType;
]

type delegationUpdateConfigActionType is 
        ConfigMinimumStakedMvkBalance of unit
    |   ConfigDelegationRatio         of unit
    |   ConfigMaxSatellites           of unit
    |   ConfigSatNameMaxLength        of unit
    |   ConfigSatDescMaxLength        of unit
    |   ConfigSatImageMaxLength       of unit
    |   ConfigSatWebsiteMaxLength     of unit

type delegationUpdateConfigParamsType is [@layout:comb] record [
    updateConfigNewValue    : nat; 
    updateConfigAction      : delegationUpdateConfigActionType;
]

type doormanUpdateConfigActionType is 
        ConfigMinMvkAmount          of unit
    |   Empty                       of unit

type doormanUpdateConfigParamsType is [@layout:comb] record [
    updateConfigNewValue    : nat; 
    updateConfigAction      : doormanUpdateConfigActionType;
]

type emergencyUpdateConfigActionType is 
        ConfigDurationInMinutes         of unit
    |   ConfigRequiredFeeMutez          of unit
    |   ConfigStakedMvkPercentRequired  of unit
    |   ConfigMinStakedMvkForVoting     of unit
    |   ConfigMinStakedMvkToTrigger     of unit
    |   ConfigProposalTitleMaxLength    of unit
    |   ConfigProposalDescMaxLength     of unit

type emergencyUpdateConfigParamsType is [@layout:comb] record [
    updateConfigNewValue  : nat; 
    updateConfigAction    : emergencyUpdateConfigActionType;
]

type farmUpdateConfigActionType is 
        ConfigForceRewardFromTransfer of unit
    |   ConfigRewardPerBlock of unit
type farmUpdateConfigParamsType is [@layout:comb] record [
    updateConfigNewValue    : nat; 
    updateConfigAction      : farmUpdateConfigActionType;
]

type farmFactoryUpdateConfigActionType is 
        ConfigFarmNameMaxLength of unit
    |   Empty                   of unit

type farmFactoryUpdateConfigParamsType is [@layout:comb] record [
    updateConfigNewValue    : nat; 
    updateConfigAction      : farmFactoryUpdateConfigActionType;
]

type governanceUpdateConfigActionType is 
        ConfigSuccessReward               of unit
    |   ConfigCycleVotersReward           of unit
    |   ConfigMinProposalRoundVotePct     of unit
    |   ConfigMinQuorumPercentage         of unit
    |   ConfigMinYayVotePercentage        of unit
    |   ConfigProposeFeeMutez             of unit
    |   ConfigMaxProposalsPerSatellite    of unit
    |   ConfigBlocksPerProposalRound      of unit
    |   ConfigBlocksPerVotingRound        of unit
    |   ConfigBlocksPerTimelockRound      of unit
    |   ConfigDataTitleMaxLength          of unit
    |   ConfigProposalTitleMaxLength      of unit
    |   ConfigProposalDescMaxLength       of unit
    |   ConfigProposalInvoiceMaxLength    of unit
    |   ConfigProposalCodeMaxLength       of unit

type governanceUpdateConfigParamsType is [@layout:comb] record [
    updateConfigNewValue    : nat; 
    updateConfigAction      : governanceUpdateConfigActionType;
]

type governanceFinancialUpdateConfigActionType is
    |   ConfigApprovalPercentage          of unit
    |   ConfigFinancialReqDurationDays    of unit

type governanceFinancialUpdateConfigParamsType is [@layout:comb] record [
    updateConfigNewValue    : nat; 
    updateConfigAction      : governanceFinancialUpdateConfigActionType;
]

type governanceSatelliteUpdateConfigActionType is 
        ConfigApprovalPercentage          of unit
    |   ConfigActionDurationInDays        of unit
    |   ConfigPurposeMaxLength            of unit
    |   ConfigMaxActionsPerSatellite      of unit

type governanceSatelliteUpdateConfigParamsType is [@layout:comb] record [
    updateConfigNewValue  : nat; 
    updateConfigAction    : governanceSatelliteUpdateConfigActionType;
]

type lendingControllerUpdateConfigActionType is 
        ConfigCollateralRatio           of unit
    |   ConfigLiquidationRatio          of unit
    |   ConfigLiquidationFeePercent     of unit
    |   ConfigAdminLiquidationFee       of unit
    |   ConfigMinimumLoanFeePercent     of unit
    |   ConfigMinLoanFeeTreasuryShare   of unit
    |   ConfigInterestTreasuryShare     of unit

type lendingControllerUpdateConfigParamsType is [@layout:comb] record [
    updateConfigNewValue    : nat;  
    updateConfigAction      : lendingControllerUpdateConfigActionType;
]

type treasuryFactoryUpdateConfigActionType is 
        ConfigTreasuryNameMaxLength of unit
    |   Empty                       of unit
type treasuryFactoryUpdateConfigParamsType is [@layout:comb] record [
    updateConfigNewValue    : nat; 
    updateConfigAction      : treasuryFactoryUpdateConfigActionType;
]

type vaultFactoryUpdateConfigActionType is 
    |   ConfigVaultNameMaxLength of unit
    |   Empty                    of unit

type vaultFactoryUpdateConfigParamsType is [@layout:comb] record [
    updateConfigNewValue    : nat; 
    updateConfigAction      : vaultFactoryUpdateConfigActionType;
]

type aggregatorPausableEntrypointType is
        UpdateData                    of bool
    |   WithdrawRewardXtz             of bool
    |   WithdrawRewardStakedMvk       of bool

type aggregatorTogglePauseEntrypointType is [@layout:comb] record [
    targetEntrypoint  : aggregatorPausableEntrypointType;
    empty             : unit
];

type aggregatorFactoryPausableEntrypointType is
        CreateAggregator            of bool
    |   UntrackAggregator           of bool
    |   TrackAggregator             of bool
    |   DistributeRewardXtz         of bool
    |   DistributeRewardStakedMvk   of bool

type aggregatorFactoryTogglePauseEntrypointType is [@layout:comb] record [
    targetEntrypoint      : aggregatorFactoryPausableEntrypointType;
    empty                 : unit
];

type delegationPausableEntrypointType is
        DelegateToSatellite             of bool
    |   UndelegateFromSatellite         of bool
    |   RegisterAsSatellite             of bool
    |   UnregisterAsSatellite           of bool
    |   UpdateSatelliteRecord           of bool
    |   DistributeReward                of bool

type delegationTogglePauseEntrypointType is [@layout:comb] record [
    targetEntrypoint  : delegationPausableEntrypointType;
    empty             : unit
];

type doormanPausableEntrypointType is
        Stake                         of bool
    |   Unstake                       of bool
    |   Exit                          of bool
    |   Compound                      of bool
    |   FarmClaim                     of bool
    |   OnVaultDepositStake           of bool
    |   OnVaultWithdrawStake          of bool
    |   OnVaultLiquidateStake         of bool

type doormanTogglePauseEntrypointType is [@layout:comb] record [
    targetEntrypoint  : doormanPausableEntrypointType;
    empty             : unit
];

type farmPausableEntrypointType is
        Deposit     of bool
    |   Withdraw    of bool
    |   Claim       of bool

type farmTogglePauseEntrypointType is [@layout:comb] record [
    targetEntrypoint  : farmPausableEntrypointType;
    empty             : unit
];

type farmFactoryPausableEntrypointType is
        CreateFarm         of bool
    |   CreateFarmMToken   of bool
    |   UntrackFarm        of bool
    |   TrackFarm          of bool

type farmFactoryTogglePauseEntrypointType is [@layout:comb] record [
    targetEntrypoint  : farmFactoryPausableEntrypointType;
    empty             : unit
];

type lendingControllerPausableEntrypointType is

        // Lending Controller Admin Entrypoints
    |   SetLoanToken                of bool
    |   SetCollateralToken          of bool

        // Lending Controller Token Pool Entrypoints
    |   AddLiquidity                of bool
    |   RemoveLiquidity             of bool

        // Lending Controller Vault Entrypoints
    |   RegisterVaultCreation       of bool
    |   CloseVault                  of bool
    |   RegisterDeposit             of bool
    |   RegisterWithdrawal          of bool
    |   MarkForLiquidation          of bool
    |   LiquidateVault              of bool
    |   Borrow                      of bool
    |   Repay                       of bool

        // Vault Entrypoints
    |   VaultDeposit                of bool
    |   VaultWithdraw               of bool
    |   VaultOnLiquidate            of bool

        // Vault Staked Token Entrypoints
    |   VaultDepositStakedToken     of bool
    |   VaultWithdrawStakedToken    of bool

type lendingControllerTogglePauseEntrypointType is [@layout:comb] record [
    targetEntrypoint  : lendingControllerPausableEntrypointType;
    empty             : unit
];

type treasuryPausableEntrypointType is
        Transfer                       of bool   
    |   MintMvkAndTransfer             of bool
    |   StakeTokens                    of bool
    |   UnstakeTokens                  of bool
    |   UpdateTokenOperatorsIsPaused   of bool

type treasuryTogglePauseEntrypointType is [@layout:comb] record [
    targetEntrypoint  : treasuryPausableEntrypointType;
    empty             : unit
];

type treasuryFactoryPausableEntrypointType is
        CreateTreasury         of bool
    |   TrackTreasury          of bool
    |   UntrackTreasury        of bool

type treasuryFactoryTogglePauseEntrypointType is [@layout:comb] record [
    targetEntrypoint  : treasuryFactoryPausableEntrypointType;
    empty             : unit
];

type vaultFactoryPausableEntrypointType is
    |   CreateVault         of bool  
    |   Empty               of unit 

type vaultFactoryTogglePauseEntrypointType is [@layout:comb] record [
    targetEntrypoint  : vaultFactoryPausableEntrypointType;
    empty             : unit
];

type lpStandardType is
        Fa12 of unit
    |   Fa2 of unit

type farmLpTokenType is [@layout:comb] record [
    tokenAddress             : address;
    tokenId                  : nat;
    tokenStandard            : lpStandardType;
]
type farmPlannedRewardsType is [@layout:comb] record[
    totalBlocks              : nat;
    currentRewardPerBlock    : nat;
]
type createFarmType is [@layout:comb] record[
    name                     : string;
    addToGeneralContracts    : bool;
    forceRewardFromTransfer  : bool;
    infinite                 : bool;
    plannedRewards           : farmPlannedRewardsType;
    metadata                 : bytes;
    lpToken                  : farmLpTokenType;
]
type createFarmMTokenType is [@layout:comb] record[
    name                     : string;
    loanToken                : string;
    addToGeneralContracts    : bool;
    forceRewardFromTransfer  : bool;
    infinite                 : bool;
    plannedRewards           : farmPlannedRewardsType;
    metadata                 : bytes;
    lpToken                  : farmLpTokenType;
]

type initFarmParamsType is [@layout:comb] record[
    totalBlocks                 : nat;
    currentRewardPerBlock       : nat;
    forceRewardFromTransfer     : bool;
    infinite                    : bool;
]

type createTreasuryType is [@layout:comb] record[
    baker                   : option(key_hash); 
    name                    : string;
    addToGeneralContracts   : bool;
    metadata                : bytes;
]

type tezType             is unit
type fa12TokenType       is address
type fa2TokenType        is [@layout:comb] record [
    tokenContractAddress    : address;
    tokenId                 : nat;
]
type tokenType is
    |   Tez    of tezType         // unit
    |   Fa12   of fa12TokenType   // address
    |   Fa2    of fa2TokenType    // record [ tokenContractAddress : address; tokenId : nat; ]

type transferDestinationType is [@layout:comb] record[
    to_       : address;
    amount    : nat;
    token     : tokenType;
]

type transferActionType is list(transferDestinationType);

type mintMvkAndTransferType is [@layout:comb] record [
    to_             : address;
    amt             : nat;
]

type operatorParameterType is [@layout:comb] record[
    owner       : address;
    operator    : address;
    token_id    : nat;
]
type updateOperatorVariantType is 
        Add_operator    of operatorParameterType
    |   Remove_operator of operatorParameterType
type updateOperatorsType is list(updateOperatorVariantType)
type updateTokenOperatorsType is [@layout:comb] record [
    tokenContractAddress    : address;
    updateOperators         : updateOperatorsType;
]
type stakeTokensType is [@layout:comb] record [
    contractAddress  : address;
    amount           : nat;
]
type unstakeTokensType is [@layout:comb] record [
    contractAddress  : address;
    amount           : nat;
]

type aggregatorConfigType is [@layout:comb] record [
    decimals                            : nat;
    alphaPercentPerThousand             : nat;

    percentOracleThreshold              : nat;
    heartbeatSeconds                    : nat;

    rewardAmountStakedMvk               : nat;
    rewardAmountXtz                     : nat;
];
type oracleInformationType is [@layout:comb] record [
    oraclePublicKey  : key;
    oraclePeerId     : string;
];
type oracleLedgerType            is map (address, oracleInformationType);
type createAggregatorParamsType is [@layout:comb] record[
    name                    : string;
    addToGeneralContracts   : bool;

    oracleLedger            : oracleLedgerType;
    
    aggregatorConfig        : aggregatorConfigType;
    metadata                : bytes;
];

type addVesteeType is [@layout:comb] record [
    vesteeAddress               : address;
    totalAllocatedAmount        : nat;
    cliffInMonths               : nat;
    vestingInMonths             : nat;
]

type updateVesteeType is [@layout:comb] record [
    vesteeAddress               : address;
    newTotalAllocatedAmount     : nat;
    newCliffInMonths            : nat;
    newVestingInMonths          : nat;
]

type createLoanTokenActionType is [@layout:comb] record [
    tokenName                               : string;
    tokenDecimals                           : nat;

    oracleAddress                           : address;

    mTokenAddress                           : address;

    reserveRatio                            : nat;  // percentage of token pool that should be kept as reserves for liquidity 
    optimalUtilisationRate                  : nat;  // kink point
    baseInterestRate                        : nat;  // base interest rate
    maxInterestRate                         : nat;  // max interest rate
    interestRateBelowOptimalUtilisation     : nat;  // interest rate below kink
    interestRateAboveOptimalUtilisation     : nat;  // interest rate above kink
    minRepaymentAmount                      : nat; 

    // variants at the end for taquito 
    tokenType                               : tokenType; 
]

type updateLoanTokenActionType is [@layout:comb] record [

    tokenName                               : string;

    oracleAddress                           : address;

    reserveRatio                            : nat;  // percentage of token pool that should be kept as reserves for liquidity 
    optimalUtilisationRate                  : nat;  // kink point
    baseInterestRate                        : nat;  // base interest rate
    maxInterestRate                         : nat;  // max interest rate
    interestRateBelowOptimalUtilisation     : nat;  // interest rate below kink
    interestRateAboveOptimalUtilisation     : nat;  // interest rate above kink
    minRepaymentAmount                      : nat; 

    isPaused                                : bool;
]

type setLoanTokenType is 
    |   CreateLoanToken      of createLoanTokenActionType
    |   UpdateLoanToken      of updateLoanTokenActionType

type setLoanTokenActionType is [@layout:comb] record [
    action      : setLoanTokenType;
    empty       : unit;
]

type createCollateralTokenActionType is [@layout:comb] record [
    tokenName               : string;
    tokenContractAddress    : address;
    tokenDecimals           : nat; 

    oracleAddress           : address;  
    protected               : bool;
    
    isScaledToken           : bool; // mToken
    
    // To extend functionality beyond sMVK to other staked tokens in future
    isStakedToken           : bool;
    stakingContractAddress  : option(address);

    maxDepositAmount        : option(nat);

    // variants at the end for taquito 
    tokenType               : tokenType; 
]

type updateCollateralTokenActionType is [@layout:comb] record [
    tokenName               : string;
    oracleAddress           : address;  
    isPaused                : bool;
    stakingContractAddress  : option(address);
    maxDepositAmount        : option(nat);
]

type setCollateralTokenType is 
    |   CreateCollateralToken      of createCollateralTokenActionType
    |   UpdateCollateralToken      of updateCollateralTokenActionType

type setCollateralTokenActionType is [@layout:comb] record [
    action      : setCollateralTokenType;
    empty       : unit;
]

type actionType is 
        // Default Entrypoint to Receive Tez
        Default                       of unit
    |   Empty                         of unit

const noOperations : list (operation) = nil;
type return is list (operation) * unit;

(* lamdda function *)
${lambdaFunction}

(* main entrypoint *)
function main (const action : actionType; const s : unit) : return is

    case action of [

            // Housekeeping Entrypoints
            Default (_parameters)                -> (lambdaFunction(), s)
        |   Empty (_parameters)                  -> ((nil : list(operation)), s)

    ]

;`;
}

const setAdmin  = (

    targetContract: string,
    newAdminAddress: string

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        ("${newAdminAddress}": address),
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%setAdmin",
            ("${targetContract}": address)) : option(contract(address))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_SET_ADMIN_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const setGovernance  = (

    targetContract: string,
    newGovernanceAddress: string

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        ("${newGovernanceAddress}" : address),
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%setGovernance",
            ("${targetContract}" : address)) : option(contract(address))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_SET_GOVERNANCE_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const setName  = (

    targetContract: string,
    newName: string

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        ("${newName}" : string),
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%setName",
            ("${targetContract}" : address)) : option(contract(string))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_SET_NAME_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const setLambda  = (

    targetContract: string,
    lambdaName: string,
    lambdaBytes: string

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        record[
            name=("${lambdaName}" : string);
            func_bytes=("${lambdaBytes}": bytes)
        ],
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%setLambda",
            ("${targetContract}" : address)) : option(contract(setLambdaType))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_SET_LAMBDA_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const setProductLambda  = (

    targetContract: string,
    lambdaName: string,
    lambdaBytes: string,
    farmType: undefined | "Farm" | "MFarm"

) => {

    // If the contract is a farm factory, the entrypoint type changes
    const entrypointType        = farmType ? "setFarmLambdaType" : "setLambdaType";
    const additionalParameter   = farmType ? `farmType=(${farmType}: farmTypeType);` : "";
    
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        record[
            name=("${lambdaName}" : string);
            func_bytes=("${lambdaBytes}": bytes);
            ${additionalParameter}
        ],
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%setProductLambda",
            ("${targetContract}" : address)) : option(contract(${entrypointType}))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_SET_PRODUCT_LAMBDA_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const updateMetadata  = (

    targetContract: string,
    metadataKey: string,
    metadataHash: string

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        record[
            metadataKey=("${metadataKey}" : string);
            metadataHash=("${metadataHash}": bytes)
        ],
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%updateMetadata",
            ("${targetContract}" : address)) : option(contract(updateMetadataType))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_UPDATE_METADATA_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const updateWhitelistContracts  = (

    targetContract: string,
    whitelistContractAddress: string,
    updateType: "Update" | "Remove"

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        record [
            whitelistContractAddress  = ("${whitelistContractAddress}" : address);
            updateType                = (${updateType} : updateType);
        ],
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%updateWhitelistContracts",
            ("${targetContract}" : address)) : option(contract(updateWhitelistContractsType))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_UPDATE_WHITELIST_CONTRACTS_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const updateGeneralContracts  = (

    targetContract: string,
    generalContractName: string,
    generalContractAddress: string,
    updateType: "Update" | "Remove"

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        record [
            generalContractName     = "${generalContractName}";
            generalContractAddress  = ("${generalContractAddress}" : address);
            updateType              = (${updateType} : updateType);
        ],
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%updateGeneralContracts",
            ("${targetContract}" : address)) : option(contract(updateGeneralContractsType))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_UPDATE_GENERAL_CONTRACTS_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const updateWhitelistTokenContracts  = (

    targetContract: string,
    tokenContractAddress: string,
    updateType: "Update" | "Remove"

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        record [
            tokenContractAddress  = ("${tokenContractAddress}" : address);
            updateType            = (${updateType} : updateType);
        ],
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%updateWhitelistTokenContracts",
            ("${targetContract}" : address)) : option(contract(updateWhitelistTokenContractsType))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_UPDATE_WHITELIST_TOKEN_CONTRACTS_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const updateConfig  = (

    targetContract: string,
    targetContractType: "aggregator" | "aggregatorFactory" | "breakGlass" | "council" | "delegation" | "doorman" | "emergencyGovernance" | "farm" | "farmFactory" | "governance" | "governanceFinancial" | "governanceSatellite" | "lendingController" | "treasuryFactory" | "vaultFactory",
    updateConfigAction: string,
    updateConfigNewValue: number

) => {

    // Generate the ligo return type based on the chosen contract
    var ligoReturnType: string
    var ligoConfigActionType: string
    switch(targetContractType){
        case "aggregator":
            ligoReturnType          = "aggregatorUpdateConfigParamsType"
            ligoConfigActionType    = "aggregatorUpdateConfigActionType"
            break;
        case "aggregatorFactory":
            ligoReturnType          = "aggregatorFactoryUpdateConfigParamsType"
            ligoConfigActionType    = "aggregatorFactoryUpdateConfigActionType"
            break;
        case "breakGlass":
            ligoReturnType          = "breakGlassUpdateConfigParamsType"
            ligoConfigActionType    = "breakGlassUpdateConfigActionType"
            break;
        case "council":
            ligoReturnType          = "councilUpdateConfigParamsType"
            ligoConfigActionType    = "councilUpdateConfigActionType"
            break;
        case "delegation":
            ligoReturnType          = "delegationUpdateConfigParamsType"
            ligoConfigActionType    = "delegationUpdateConfigActionType"
            break;
        case "doorman":
            ligoReturnType          = "doormanUpdateConfigParamsType"
            ligoConfigActionType    = "doormanUpdateConfigActionType"
            break;
        case "emergencyGovernance":
            ligoReturnType          = "emergencyUpdateConfigParamsType"
            ligoConfigActionType    = "emergencyUpdateConfigActionType"
            break;
        case "farm":
            ligoReturnType          = "farmUpdateConfigParamsType"
            ligoConfigActionType    = "farmUpdateConfigActionType"
            break;
        case "farmFactory":
            ligoReturnType          = "farmFactoryUpdateConfigParamsType"
            ligoConfigActionType    = "farmFactoryUpdateConfigActionType"
            break;
        case "governance":
            ligoReturnType          = "governanceUpdateConfigParamsType"
            ligoConfigActionType    = "governanceUpdateConfigActionType"
            break;
        case "governanceFinancial":
            ligoReturnType          = "governanceFinancialUpdateConfigParamsType"
            ligoConfigActionType    = "governanceFinancialUpdateConfigActionType"
            break;
        case "governanceSatellite":
            ligoReturnType          = "governanceSatelliteUpdateConfigParamsType"
            ligoConfigActionType    = "governanceSatelliteUpdateConfigActionType"
            break;
        case "lendingController":
            ligoReturnType          = "lendingControllerUpdateConfigParamsType"
            ligoConfigActionType    = "lendingControllerUpdateConfigActionType"
            break;
        case "treasuryFactory":
            ligoReturnType          = "treasuryFactoryUpdateConfigParamsType"
            ligoConfigActionType    = "treasuryFactoryUpdateConfigActionType"
            break;
        case "vaultFactory":
            ligoReturnType          = "vaultFactoryUpdateConfigParamsType"
            ligoConfigActionType    = "vaultFactoryUpdateConfigActionType"
            break;
    }

    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        record [
            updateConfigNewValue    = ${updateConfigNewValue}n; 
            updateConfigAction      = (${updateConfigAction + "(Unit)"} : ${ligoConfigActionType})
        ],
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%updateConfig",
            ("${targetContract}" : address)) : option(contract(${ligoReturnType}))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_UPDATE_CONFIG_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const pauseAll  = (

    targetContract: string

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        unit,
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%pauseAll",
            ("${targetContract}" : address)) : option(contract(unit))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_PAUSE_ALL_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const unpauseAll  = (

    targetContract: string

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        unit,
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%unpauseAll",
            ("${targetContract}" : address)) : option(contract(unit))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_UNPAUSE_ALL_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const togglePauseEntrypoint  = (

    targetContract: string,
    targetContractType: "aggregator" | "aggregatorFactory" | "delegation" | "doorman" | "farm" | "farmFactory" | "lendingController" | "treasury" | "treasuryFactory" | "vaultFactory",
    targetEntrypoint: string,
    pause: boolean

) => {

    // Generate the ligo return type based on the chosen contract
    var ligoReturnType: string
    var ligoPausableEntrypointType: string
    switch(targetContractType){
        case "aggregator":
            ligoReturnType              = "aggregatorTogglePauseEntrypointType"
            ligoPausableEntrypointType  = "aggregatorPausableEntrypointType"
            break;
        case "aggregatorFactory":
            ligoReturnType              = "aggregatorFactoryTogglePauseEntrypointType"
            ligoPausableEntrypointType  = "aggregatorFactoryPausableEntrypointType"
            break;
        case "delegation":
            ligoReturnType              = "delegationTogglePauseEntrypointType"
            ligoPausableEntrypointType  = "delegationPausableEntrypointType"
            break;
        case "doorman":
            ligoReturnType              = "doormanTogglePauseEntrypointType"
            ligoPausableEntrypointType  = "doormanPausableEntrypointType"
            break;
        case "farm":
            ligoReturnType              = "farmTogglePauseEntrypointType"
            ligoPausableEntrypointType  = "farmPausableEntrypointType"
            break;
        case "farmFactory":
            ligoReturnType              = "farmFactoryTogglePauseEntrypointType"
            ligoPausableEntrypointType  = "farmFactoryPausableEntrypointType"
            break;
        case "lendingController":
            ligoReturnType              = "lendingControllerTogglePauseEntrypointType"
            ligoPausableEntrypointType  = "lendingControllerPausableEntrypointType"
            break;
        case "treasury":
            ligoReturnType              = "treasuryTogglePauseEntrypointType"
            ligoPausableEntrypointType  = "treasuryPausableEntrypointType"
            break;
        case "treasuryFactory":
            ligoReturnType              = "treasuryFactoryTogglePauseEntrypointType"
            ligoPausableEntrypointType  = "treasuryFactoryPausableEntrypointType"
            break;
        case "vaultFactory":
            ligoReturnType              = "vaultFactoryTogglePauseEntrypointType"
            ligoPausableEntrypointType  = "vaultFactoryPausableEntrypointType"
            break;
    }

    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        record [
            targetEntrypoint  = (${targetEntrypoint}(${pause ? "True" : "False"}): ${ligoPausableEntrypointType});
            empty             = Unit;
        ],
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%togglePauseEntrypoint",
            ("${targetContract}" : address)) : option(contract(${ligoReturnType}))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_TOGGLE_PAUSE_ENTRYPOINT_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const updateWhitelistDevelopers  = (

    targetContract: string,
    whitelistedDeveloperAddress: string

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        ("${whitelistedDeveloperAddress}" : address),
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%updateWhitelistDevelopers",
            ("${targetContract}" : address)) : option(contract(address))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_UPDATE_WHITELIST_DEVELOPERS_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const setGovernanceProxy  = (

    targetContract: string,
    governanceProxyAddress: string

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        ("${governanceProxyAddress}" : address),
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%setGovernanceProxy",
            ("${targetContract}" : address)) : option(contract(address))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_SET_GOVERNANCE_PROXY_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const createFarm  = (

    targetContract          : string,
    farmName                : string,
    addToGeneralContracts   : boolean,
    forceRewardFromTransfer : boolean,
    infinite                : boolean,
    totalBlocks             : number,
    currentRewardPerBlock   : number,
    metadata                : string,
    lpTokenAddress          : string,
    lpTokenId               : number,
    lpTokenStandard         : "fa12" | "fa2"

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        record[
            name                     = "${farmName}";
            addToGeneralContracts    = ${addToGeneralContracts ? "True" : "False"};
            forceRewardFromTransfer  = ${forceRewardFromTransfer ? "True" : "False"};
            infinite                 = ${infinite ? "True" : "False"};
            plannedRewards           = record[
                totalBlocks              = (${totalBlocks}n: nat);
                currentRewardPerBlock    = ${currentRewardPerBlock}n;
            ];
            metadata                 = ("${metadata}": bytes);
            lpToken                  = record[
                tokenAddress             = ("${lpTokenAddress}" : address);
                tokenId                  = ${lpTokenId}n;
                tokenStandard            = (${lpTokenStandard == "fa12" ? "Fa12" : "Fa2"}: lpStandardType);
            ];
        ],
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%createFarm",
            ("${targetContract}" : address)) : option(contract(createFarmType))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_CREATE_FARM_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const createFarmMToken  = (

    targetContract          : string,
    farmName                : string,
    loanToken               : string,
    addToGeneralContracts   : boolean,
    forceRewardFromTransfer : boolean,
    infinite                : boolean,
    totalBlocks             : number,
    currentRewardPerBlock   : number,
    metadata                : string,
    lpTokenAddress          : string,
    lpTokenId               : number,
    lpTokenStandard         : "fa12" | "fa2"

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        record[
            name                     = "${farmName}";
            loanToken                = "${loanToken}";
            addToGeneralContracts    = ${addToGeneralContracts ? "True" : "False"};
            forceRewardFromTransfer  = ${forceRewardFromTransfer ? "True" : "False"};
            infinite                 = ${infinite ? "True" : "False"};
            plannedRewards           = record[
                totalBlocks              = (${totalBlocks}n: nat);
                currentRewardPerBlock    = ${currentRewardPerBlock}n;
            ];
            metadata                 = ("${metadata}": bytes);
            lpToken                  = record[
                tokenAddress             = ("${lpTokenAddress}" : address);
                tokenId                  = ${lpTokenId}n;
                tokenStandard            = (${lpTokenStandard == "fa12" ? "Fa12" : "Fa2"}: lpStandardType);
            ];
        ],
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%createFarmMToken",
            ("${targetContract}" : address)) : option(contract(createFarmMTokenType))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_CREATE_FARM_M_TOKEN_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const initFarm  = (

    targetContract          : string,
    totalBlocks             : number,
    currentRewardPerBlock   : number,
    forceRewardFromTransfer : boolean,
    infinite                : boolean,

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        record[
            totalBlocks                 = ${totalBlocks}n;
            currentRewardPerBlock       = ${currentRewardPerBlock}n;
            forceRewardFromTransfer     = ${forceRewardFromTransfer ? "True" : "False"};
            infinite                    = ${infinite ? "True" : "False"};
        ],
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%initFarm",
            ("${targetContract}" : address)) : option(contract(initFarmParamsType))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_INIT_FARM_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const closeFarm  = (

    targetContract          : string

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        unit,
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%closeFarm",
            ("${targetContract}" : address)) : option(contract(unit))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_CLOSE_FARM_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const createTreasury  = (

    targetContract          : string,
    baker                   : string | undefined,
    treasuryName            : string,
    addToGeneralContracts   : boolean,
    metadata                : string

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        (record[
            baker                   = (${baker ? "Some((\"" + baker + "\": key_hash))" : "None"} : option(key_hash));
            name                    = "${treasuryName}";
            addToGeneralContracts   = ${addToGeneralContracts ? "True" : "False"};
            metadata                = ("${metadata}": bytes);
        ] : createTreasuryType),
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%createTreasury",
            ("${targetContract}" : address)) : option(contract(createTreasuryType))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_CREATE_TREASURY_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const transfer  = (

    targetContract          : string,
    transfers               : Array<transferItem>

) => {

    // Create the transfer record list
    var transfersRecord: string = "";
    transfers.forEach((transfer) => {
        
        // Create the token type
        const tokenTypeFa12 = transfer.token as fa12;
        const tokenTypeFa2  = transfer.token as fa2;
        var tokenType: any;
        if(transfer.token === "tez"){
            tokenType       = "Tez";
        }
        else if("fa12" in transfer.token){
            tokenType       = `Fa12(("${tokenTypeFa12.fa12}": address))`;
        }
        else if("fa2" in transfer.token){
            tokenType       = `Fa2(record[
                    tokenContractAddress    = ("${tokenTypeFa2.fa2.tokenContractAddress}": address);
                    tokenId                 = ${tokenTypeFa2.fa2.tokenId}n;
                ])`;
        }
        
        // Create and append the transfer record
        transfersRecord     += `
            record[
                to_       = ("${transfer.to_}" : address);
                amount    = ${transfer.amount}n;
                token     = ${tokenType};
            ];
        `;
    });

    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        list[
            ${transfersRecord}
        ],
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%transfer",
            ("${targetContract}" : address)) : option(contract(transferActionType))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_TRANSFER_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const mintMvkAndTransfer  = (

    targetContract          : string,
    to_                     : string,
    amount                  : number

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        record [
            to_ = ("${to_}" : address);
            amt = ${amount}n;
        ],
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%mintMvkAndTransfer",
            ("${targetContract}" : address)) : option(contract(mintMvkAndTransferType))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_MINT_MVK_AND_TRANSFER_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const updateTokenOperators  = (

    targetContract          : string,
    tokenContractAddress    : string,
    operators               : Array<addOperator | removeOperator>

) => {

    // Create the update operator list
    var operatorRecord: string = "";
    operators.forEach((operator) => {
        if("addOperator" in operator){
            const addOperatorItem: addOperator  = operator as addOperator;
            operatorRecord  += `
            Add_operator(record[
                owner    = ("${addOperatorItem.addOperator.owner}" : address);
                operator = ("${addOperatorItem.addOperator.operator}" : address);
                token_id = ${addOperatorItem.addOperator.tokenId}n;
            ]);
            `
        }
        else {
            const removeOperatorItem: removeOperator  = operator as removeOperator;
            operatorRecord  += `
            Remove_operator(record[
                owner    = ("${removeOperatorItem.removeOperator.owner}" : address);
                operator = ("${removeOperatorItem.removeOperator.operator}" : address);
                token_id = ${removeOperatorItem.removeOperator.tokenId}n;
            ]);
            `
        }
    });

    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        record[
            tokenContractAddress    = ("${tokenContractAddress}" : address);
            updateOperators         = list[
            ${operatorRecord}
            ];
        ],
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%updateTokenOperators",
            ("${targetContract}" : address)) : option(contract(updateTokenOperatorsType))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_UPDATE_MVK_OPERATORS_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const stakeTokens  = (

    targetContract          : string,
    stakingContract         : string,
    amount                  : number

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        record[
            contractAddress     = ("${stakingContract}" : address);
            amount              = ${amount}n;
        ],
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%stakeTokens",
            ("${targetContract}" : address)) : option(contract(stakeTokensType))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_STAKE_MVK_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const unstakeTokens  = (

    targetContract          : string,
    stakingContract         : string,
    amount                  : number

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        record[
            contractAddress     = ("${stakingContract}" : address);
            amount              = ${amount}n;
        ],
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%unstakeTokens",
            ("${targetContract}" : address)) : option(contract(unstakeTokensType))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_UNSTAKE_MVK_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const createAggregator  = (

    targetContract          : string,
    aggregatorName          : string,
    addToGeneralContracts   : boolean,
    oraclesInformation      : Array<oracleInformation>,
    decimals                : number,
    alphaPercentPerThousand : number,
    percentOracleThreshold  : number,
    heartbeatSeconds        : number,
    rewardAmountStakedMvk   : number,
    rewardAmountXtz         : number,
    metadata                : string

) => {

    // Create the oracle informations
    var oracleLedger: string = "";
    oraclesInformation.forEach((information: oracleInformation) => {
        oracleLedger += `
            ("${information.oracleAddress}" : address) -> record [
                    oraclePublicKey = ("${information.oraclePublicKey}" : key);
                    oraclePeerId    = "${information.oraclePeerId}";
                ];`;
    });

    const lambda =  `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        (record[
            name                  = "${aggregatorName}";
            addToGeneralContracts = ${addToGeneralContracts ? "True" : "False"};
            oracleLedger          = map[${oracleLedger}
            ];
            aggregatorConfig      = record [
                decimals                = ${decimals}n;
                alphaPercentPerThousand = ${alphaPercentPerThousand}n;
                percentOracleThreshold  = ${percentOracleThreshold}n;
                heartbeatSeconds        = ${heartbeatSeconds}n;
                rewardAmountStakedMvk   = ${rewardAmountStakedMvk}n;
                rewardAmountXtz         = ${rewardAmountXtz}n;
            ];
            metadata              = ("${metadata}": bytes);
        ] : createAggregatorParamsType),
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%createAggregator",
            ("${targetContract}" : address)) : option(contract(createAggregatorParamsType))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_CREATE_AGGREGATOR_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
return lambda
};

const updateInflationRate  = (

    targetContract          : string,
    inflationRate           : number

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        ${inflationRate}n,
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%updateInflationRate",
            ("${targetContract}" : address)) : option(contract(nat))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_UPDATE_INFLATION_RATE_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const triggerInflation  = (

    targetContract          : string

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        unit,
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%triggerInflation",
            ("${targetContract}" : address)) : option(contract(unit))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_TRIGGER_INFLATION_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const trackProductContract  = (

    targetContract          : string,
    productContractType     : "aggregator" | "farm" | "treasury",
    productContractAddress  : string

) => {

    // Choose the track entrypoint
    var trackEntrypoint: string;
    switch(productContractType){
        case "aggregator":
            trackEntrypoint = "%trackAggregator";
            break;
        case "farm":
            trackEntrypoint = "%trackFarm";
            break;
        case "treasury":
            trackEntrypoint = "%trackTreasury";
            break;
    }

    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        ("${productContractAddress}" : address),
        0tez,
        case (Tezos.get_entrypoint_opt(
            "${trackEntrypoint}",
            ("${targetContract}" : address)) : option(contract(address))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_TRACK_CONTRACT_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const untrackProductContract  = (

    targetContract          : string,
    productContractType     : "aggregator" | "farm" | "treasury",
    productContractAddress  : string

) => {

    // Choose the track entrypoint
    var trackEntrypoint: string;
    switch(productContractType){
        case "aggregator":
            trackEntrypoint = "%untrackAggregator";
            break;
        case "farm":
            trackEntrypoint = "%untrackFarm";
            break;
        case "treasury":
            trackEntrypoint = "%untrackTreasury";
            break;
    }

    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        ("${productContractAddress}" : address),
        0tez,
        case (Tezos.get_entrypoint_opt(
            "${trackEntrypoint}",
            ("${targetContract}" : address)) : option(contract(address))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_UNTRACK_CONTRACT_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const addVestee  = (

    targetContract          : string,
    vesteeAddress           : string,
    totalAllocatedAmount    : number,
    cliffInMonths           : number,
    vestingInMonths         : number

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        record [
            vesteeAddress        = ("${vesteeAddress}" : address);
            totalAllocatedAmount = ${totalAllocatedAmount}n;
            cliffInMonths        = ${cliffInMonths}n;
            vestingInMonths      = ${vestingInMonths}n;
        ],
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%addVestee",
            ("${targetContract}" : address)) : option(contract(addVesteeType))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_ADD_VESTEE_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const removeVestee  = (

    targetContract          : string,
    vesteeAddress           : string

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        ("${vesteeAddress}" : address),
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%removeVestee",
            ("${targetContract}" : address)) : option(contract(address))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_REMOVE_VESTEE_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const updateVestee  = (

    targetContract          : string,
    vesteeAddress           : string,
    newTotalAllocatedAmount : number,
    newCliffInMonths        : number,
    newVestingInMonths      : number

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        record [
            vesteeAddress           = ("${vesteeAddress}" : address);
            newTotalAllocatedAmount = ${newTotalAllocatedAmount}n;
            newCliffInMonths        = ${newCliffInMonths}n;
            newVestingInMonths      = ${newVestingInMonths}n;
        ],
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%updateVestee",
            ("${targetContract}" : address)) : option(contract(updateVesteeType))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_UPDATE_VESTEE_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const toggleVesteeLock  = (

    targetContract          : string,
    vesteeAddress           : string

) => {
    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        ("${vesteeAddress}" : address),
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%toggleVesteeLock",
            ("${targetContract}" : address)) : option(contract(address))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_TOGGLE_VESTEE_LOCK_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const setLoanToken  = (

    targetContract          : string,
    setLoanTokenAction      : createLoanToken | updateLoanToken

) => {

    // Parse loan token action
    var loanTokenActionRecord: string;

    if("createLoanToken" in setLoanTokenAction){
        // Cast the action
        const actionCast            = setLoanTokenAction as createLoanToken;
        const createLoanTokenAction = actionCast.createLoanToken;
        
        // Prepare the token type
        const tokenTypeFa12 = createLoanTokenAction.tokenType as fa12;
        const tokenTypeFa2  = createLoanTokenAction.tokenType as fa2;
        var tokenType: any;
        if(createLoanTokenAction.tokenType === "tez"){
            tokenType       = "Tez";
        }
        else if("fa12" in createLoanTokenAction.tokenType){
            tokenType       = `Fa12(("${tokenTypeFa12.fa12}": address))`;
        }
        else if("fa2" in createLoanTokenAction.tokenType){
            tokenType       = `Fa2(record[
                tokenContractAddress    = ("${tokenTypeFa2.fa2.tokenContractAddress}": address);
                tokenId                 = ${tokenTypeFa2.fa2.tokenId}n;
            ])`;
        }

        // Prepare the loan token record
        loanTokenActionRecord   = `CreateLoanToken(record [
                tokenName                           = ("${createLoanTokenAction.tokenName}" : string);
                tokenDecimals                       = (${createLoanTokenAction.tokenDecimals}n : nat);
                oracleAddress                       = ("${createLoanTokenAction.oracleAddress}" : address);
                mTokenAddress                       = ("${createLoanTokenAction.mTokenAddress}" : address);
                reserveRatio                        = (${createLoanTokenAction.reserveRatio}n : nat);
                optimalUtilisationRate              = (${createLoanTokenAction.optimalUtilisationRate}n : nat);
                baseInterestRate                    = (${createLoanTokenAction.baseInterestRate}n : nat);
                maxInterestRate                     = (${createLoanTokenAction.maxInterestRate}n : nat);
                interestRateBelowOptimalUtilisation = (${createLoanTokenAction.interestRateBelowOptimalUtilisation}n : nat);
                interestRateAboveOptimalUtilisation = (${createLoanTokenAction.interestRateAboveOptimalUtilisation}n : nat);
                minRepaymentAmount                  = (${createLoanTokenAction.minRepaymentAmount}n : nat);
                tokenType                           = (${tokenType} : tokenType);
            ])`;
    }
    else {
        // Cast the action
        const actionCast                    = setLoanTokenAction as updateLoanToken;
        const updateCollateralTokenAction   = actionCast.updateLoanToken;

        // Prepare the loan token record
        loanTokenActionRecord   = `UpdateLoanToken(record [
                tokenName                               = ("${updateCollateralTokenAction.tokenName}" : string);
                oracleAddress                           = ("${updateCollateralTokenAction.oracleAddress}" : address);
                reserveRatio                            = (${updateCollateralTokenAction.reserveRatio}n : nat);
                optimalUtilisationRate                  = (${updateCollateralTokenAction.optimalUtilisationRate}n : nat);
                baseInterestRate                        = (${updateCollateralTokenAction.baseInterestRate}n : nat);
                maxInterestRate                         = (${updateCollateralTokenAction.maxInterestRate}n : nat);
                interestRateBelowOptimalUtilisation     = (${updateCollateralTokenAction.interestRateBelowOptimalUtilisation}n : nat);
                interestRateAboveOptimalUtilisation     = (${updateCollateralTokenAction.interestRateAboveOptimalUtilisation}n : nat);
                minRepaymentAmount                      = (${updateCollateralTokenAction.minRepaymentAmount}n : nat);
                isPaused                                = (${updateCollateralTokenAction.isPaused} : bool);
            ])`;
    }

    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        record [
            action = ${loanTokenActionRecord};
            empty  = Unit;
        ],
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%setLoanToken",
            ("${targetContract}" : address)) : option(contract(setLoanTokenActionType))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_SET_LOAN_TOKEN_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

const setCollateralToken  = (

    targetContract              : string,
    setCollateralTokenAction    : createCollateralToken | updateCollateralToken

) => {

    // Parse loan token action
    var loanTokenActionRecord: string;

    if("createCollateralToken" in setCollateralTokenAction){
        // Cast the action
        const actionCast                    = setCollateralTokenAction as createCollateralToken;
        const createCollateralTokenAction   = actionCast.createCollateralToken;
        
        // Prepare the token type
        const tokenTypeFa12 = createCollateralTokenAction.tokenType as fa12;
        const tokenTypeFa2  = createCollateralTokenAction.tokenType as fa2;
        var tokenType: any;
        if(createCollateralTokenAction.tokenType === "tez"){
            tokenType       = "Tez";
        }
        else if("fa12" in createCollateralTokenAction.tokenType){
            tokenType       = `Fa12(("${tokenTypeFa12.fa12}": address))`;
        }
        else if("fa2" in createCollateralTokenAction.tokenType){
            tokenType       = `Fa2(record[
                tokenContractAddress    = ("${tokenTypeFa2.fa2.tokenContractAddress}": address);
                tokenId                 = ${tokenTypeFa2.fa2.tokenId}n;
            ])`;
        }

        // Prepare the loan token record
        loanTokenActionRecord   = `CreateCollateralToken(record [
                tokenName              = "${createCollateralTokenAction.tokenName}";
                tokenContractAddress   = ("${createCollateralTokenAction.tokenContractAddress}" : address);
                tokenDecimals          = ${createCollateralTokenAction.tokenDecimals}n;
                oracleAddress          = ("${createCollateralTokenAction.oracleAddress}" : address);
                protected              = ${createCollateralTokenAction.protected ? "True" : "False"};
                isScaledToken          = ${createCollateralTokenAction.isScaledToken ? "True" : "False"};
                isStakedToken          = ${createCollateralTokenAction.isStakedToken ? "True" : "False"};
                stakingContractAddress = ${createCollateralTokenAction.stakingContractAddress ? "Some((\"" + createCollateralTokenAction.stakingContractAddress + "\" : address))" : "None"};
                maxDepositAmount       = ${createCollateralTokenAction.maxDepositAmount ? "Some(" + createCollateralTokenAction.maxDepositAmount + "n)" : "None"};
                tokenType              = ${tokenType};
            ]);`;
    }
    else {
        // Cast the action
        const actionCast            = setCollateralTokenAction as updateCollateralToken;
        const updateLoanTokenAction = actionCast.updateCollateralToken;

        // Prepare the loan token record
        loanTokenActionRecord   = `UpdateCollateralToken(record [
                tokenName              = "${updateLoanTokenAction.tokenName}";
                oracleAddress          = ("${updateLoanTokenAction.oracleAddress}" : address);
                isPaused               = ${updateLoanTokenAction.isPaused ? "True" : "False"};
                stakingContractAddress = ${updateLoanTokenAction.stakingContractAddress ? "Some((\"" + updateLoanTokenAction.stakingContractAddress + "\" : address))" : "None"};
                maxDepositAmount       = ${updateLoanTokenAction.maxDepositAmount ? "Some(" + updateLoanTokenAction.maxDepositAmount + "n)" : "None"};
            ]);`;
    }

    return `function lambdaFunction (const _ : unit) : list(operation) is
block {
    const contractOperation : operation = Tezos.transaction(
        record [
            action = ${loanTokenActionRecord}
            empty  = Unit;
        ],
        0tez,
        case (Tezos.get_entrypoint_opt(
            "%setCollateralToken",
            ("${targetContract}" : address)) : option(contract(setCollateralTokenActionType))) of [
                    Some(contr) -> contr
                |   None        -> (failwith("error_SET_COLLATERAL_TOKEN_THROUGH_PROXY_LAMBDA_FAIL"))
        ]
    );
} with list[contractOperation]`
};

export const generateProxyContract = (

    lambdaFunctionName: string,
    lambdaFunctionParameters: Array<any> = []

) => {
    // Create the function call
    var functionCall: string  = lambdaFunctionName + "(";
    lambdaFunctionParameters.forEach((parameter: any) => {
        var formattedParameter: string  = parameter;
        var parameterType: string       = typeof(parameter);
        switch(parameterType){
            case "string":
                formattedParameter  = `"${formattedParameter}"`;
                break;
            case "object":
                formattedParameter  = (JSON.stringify(parameter));
                break;
            default:
        }
        functionCall += formattedParameter + ","
    })
    functionCall = functionCall.slice(0, -1) + ")";
    
    // Return the generated contract
    return proxyContract(eval(functionCall));
}
