#!/bin/bash
# ============================================
# Update BASE_ADDRESSES in addresses.ts after mainnet deploy
# ============================================
#
# USAGE: After running deploy-base-mainnet.sh, copy the addresses and run:
#
#   bash scripts/update-addresses.sh \
#     --lclaw 0x... \
#     --router 0x... \
#     --poolFactory 0x... \
#     --votingEscrow 0x... \
#     --voter 0x... \
#     --minter 0x... \
#     --rewardsDistributor 0x... \
#     --factoryRegistry 0x... \
#     --aiVault 0x... \
#     --aiStrategyRegistry 0x...
#
# Then: git add . && git commit -m "Add mainnet addresses" && git push
# ============================================

set -e

FILE="lib/contracts/addresses.ts"

# Parse args
while [[ $# -gt 0 ]]; do
  case $1 in
    --lclaw) LCLAW="$2"; shift 2;;
    --router) ROUTER="$2"; shift 2;;
    --poolFactory) POOL_FACTORY="$2"; shift 2;;
    --votingEscrow) VOTING_ESCROW="$2"; shift 2;;
    --voter) VOTER="$2"; shift 2;;
    --minter) MINTER="$2"; shift 2;;
    --rewardsDistributor) REWARDS_DIST="$2"; shift 2;;
    --factoryRegistry) FACTORY_REG="$2"; shift 2;;
    --aiVault) AI_VAULT="$2"; shift 2;;
    --aiStrategyRegistry) AI_STRATEGY="$2"; shift 2;;
    *) echo "Unknown option: $1"; exit 1;;
  esac
done

ZERO="0x0000000000000000000000000000000000000000"

# Validate all addresses provided
for var in LCLAW ROUTER POOL_FACTORY VOTING_ESCROW VOTER MINTER REWARDS_DIST FACTORY_REG AI_VAULT AI_STRATEGY; do
  val="${!var}"
  if [ -z "$val" ] || [ "$val" = "$ZERO" ]; then
    echo "ERROR: Missing or zero address for --$(echo $var | tr '[:upper:]' '[:lower:]')"
    exit 1
  fi
done

echo "Updating $FILE with mainnet addresses..."

# Update each address
sed -i "s|lclaw: \"$ZERO\"|lclaw: \"$LCLAW\"|" "$FILE"
sed -i "s|router: \"$ZERO\"|router: \"$ROUTER\"|" "$FILE"
sed -i "s|poolFactory: \"$ZERO\"|poolFactory: \"$POOL_FACTORY\"|" "$FILE"
sed -i "s|votingEscrow: \"$ZERO\"|votingEscrow: \"$VOTING_ESCROW\"|" "$FILE"
sed -i "s|voter: \"$ZERO\"|voter: \"$VOTER\"|" "$FILE"
sed -i "s|minter: \"$ZERO\"|minter: \"$MINTER\"|" "$FILE"
sed -i "s|rewardsDistributor: \"$ZERO\"|rewardsDistributor: \"$REWARDS_DIST\"|" "$FILE"
sed -i "s|factoryRegistry: \"$ZERO\"|factoryRegistry: \"$FACTORY_REG\"|" "$FILE"
sed -i "s|aiVault: \"$ZERO\"|aiVault: \"$AI_VAULT\"|" "$FILE"
sed -i "s|aiStrategyRegistry: \"$ZERO\"|aiStrategyRegistry: \"$AI_STRATEGY\"|" "$FILE"

# Also update LCLAW address in BASE_TOKENS
sed -i "s|address: \"0x8D4DeBA522eB9FaB5Edb7DF61398C450FF6898c3\"|address: \"$LCLAW\"|" "$FILE"

echo "✅ Addresses updated!"
echo ""
echo "Now run:"
echo "  git add lib/contracts/addresses.ts"
echo "  git commit -m 'Add Base mainnet contract addresses'"
echo "  git push origin main"
