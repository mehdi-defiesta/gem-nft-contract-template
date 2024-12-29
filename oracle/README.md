# Staking Index Oracle

## description

This script is an event listener which catches events ```Deposited``` and ```WithdrawalRequested``` emitted in L1WrappedStakedTON. the script is made to run within a docker container. 

## Installation steps

fill the .env
```
SEPOLIA_RPC_URL=
PRIVATE_KEY=
L2_RPC_URL=

L1_WRAPPED_STAKED_TON=
MARKETPLACE=
WSTON_SWAP_POOL=
```

build the docker image
```
docker build -t my-go-app .
```

run the container
```
docker run -d -p 8080:8080 --env-file .env my-go-app
```
