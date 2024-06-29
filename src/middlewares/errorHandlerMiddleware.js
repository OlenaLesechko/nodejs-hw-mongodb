const errorHandlerMiddleware = (error, req, res) => {
    res.status(500).json({
        message: "Something went wrong",
        data: error.message,
    });
};

export default errorHandlerMiddleware;