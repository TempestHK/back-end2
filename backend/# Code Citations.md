# Code Citations

## License: unknown

https://github.com/yiyangd/yiyangd.github.io/tree/18fad751b5a5226531e7d7f9a99cc3c17904df35/ecommerceapp03/index.md

```
.js
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req
```

## License: unknown

https://github.com/yhchan0918/backend-test/tree/2f34968bfee8983b5e375a628010d772aace46c4/middleware/errorMiddleware.js

```
req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) =
```

## License: unknown

https://github.com/YuwethaNesan/new/tree/5e5a218f647e179e8db273bb2bb3caf5fa2dcacf/backend/middleware/errorMiddleware.js

```
const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode =
```

## License: unknown

https://github.com/kevinlim605/project-initialization/tree/6a7d25ca7ab2197f939c56b27178577f40ec6a94/server/middleware/errorMiddleware.js

```
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env
```

## License: unknown

https://github.com/kblovett/wetbat/tree/2080317c1cab71da4e78e3b1c9e8df21f074a8d0/backend/middleware/errorMiddleware.js

```
500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export { notFound, errorHandler }
```
