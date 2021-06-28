# How to run?
```
docker-compose up
```

# Endpoints

## /cost POST
```
{
  startDate,
  endDate,
  rateId
}
```

## /booking POST
```
{
  startDate,
  endDate,
  rateId,
  carId
}
```

## /report/getById GET
```
{
  carId
}
```

## /report/getAllCars GET
```
{

}
```
