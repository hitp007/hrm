
const errorType = {
  NotFoundException:{
    message: "Not Found",
    statusCode: 400,
  },
  BAD_REQUEST: {
    message: "You Have hit Bad Request.",
    statusCode: 400,
  },
  UNAUTHORIZED: {
    message: "Authentication is needed to get requested response.",
    statusCode: 401,
  },
  GRAPHQL_VALIDATION_FAILED: {
    message: "Please Check Your Input Again.",
    statusCode: 400,
  },
  INTERNAL_SERVER_ERROR: {
    message: "this cases are not checked yet",
    statusCode: 500,
  },
  GRAPHQL_PARSE_FAILED: {
    message: "parsing issue please check again",
    statusCode: 400,
  },
  BAD_USER_INPUT: {
    message: "bad input is added",
    statusCode: 404,
  },
  PERSISTED_QUERY_NOT_FOUND: {
    message: "query was not in the APQ cache",
    statusCode: 402,
  },
  PERSISTED_QUERY_NOT_SUPPORTED: {
    message: "persisted query not supported",
    statusCode: 400,
  },
  OPERATION_RESOLUTION_FAILURE: {
    message: "opeartion resolution failure",
    statusCode: 400,
  },
  UNAUTHENTICATED: {
    message: "You are not authenticated to access this",
    statusCode: 403,
  },
};

const getErrorCode = (errorName) => {
  return errorType[errorName];
};
module.exports = getErrorCode;