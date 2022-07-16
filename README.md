Exercise for listening to websockets.  Extra comments in code due to testing out Github Copilot.

## Expected behavior

Application listnes to webcsoket at configures path. This websocket is expected to be publicly accessible and stream events with data format like:
```
{"s":"AAPL","symbol":"ARVL","t":1651515264421,"p": 90.75}
```

From these events the application generates cached stock candles for each time interval. Default configuration set up for 1 minute intervals.

To verify the applications correctly listnes and caches data a simple HTTP GET endpoint will be set up that accepts stock symbol as query parameter and returns array of stock candles since the start of the service. No limits or filtering will be implemented for this endpoint.


## Running the service

The service is encapsulated in a Docker container and needs to be built before it can be run.

### Requirements

Docker needs to be installed on the machine


### Build

Before building it may be necessary to update configuration in `config.js` file for stock server host and for candle interval.


To build the Docker image run the following command:
```
docker build -t candles . -f docker/Dockerfile
```
This will produce a Docker image named `candles`

### Run

To create and start a container from the built docker image run the following command:
```
docker run -p 8080:8080 candles
```
After this the service is accessible from `localhost:8080`

## Retrieving data

The service exposes the following endpoints
* GET /candles?stock=<symbol>
* GET /stocks

These can be queried as follows:

### Get candles for single stock
```
curl http://localhost:8080/candles?stock=<symbol>
```

This should return JSON in the following format:
```
{
    <symbol>: [
        {
            "startTime": <number>,
            "endTime": <number>,
            "highPrice": <number>,
            "lowPrice": <number>,
            "openPrice": <number>,
            "closePrice": <number>
        }
    ]
}
```


### Get list of all cached stock symbols
```
curl http://localhost:8080/stocks
```

This should return JSON in the following format:
```
{
    "symbols": [<string>,...,<string>]
}
```