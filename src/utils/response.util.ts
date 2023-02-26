type StatusResponse = {
  status: boolean;
  message: string;
};

export const statusRes = (status: number): StatusResponse => {
  const success: StatusResponse = { status: true, message: "Success!" };
  const fail: StatusResponse = { status: false, message: "Fail!" };
  const errorMap: { [key: number]: string } = {
    400: "BadRequest",
    401: "Unauthorized",
    402: "PaymentRequired",
    403: "Forbidden",
    404: "NotFound",
    405: "MethodNotAllowed",
    406: "NotAcceptable",
    407: "ProxyAuthenticationRequired",
    408: "RequestTimeout",
    409: "Conflict",
    410: "Gone",
    411: "LengthRequired",
    412: "PreconditionFailed",
    413: "PayloadTooLarge",
    414: "URITooLong",
    415: "UnsupportedMediaType",
    416: "RangeNotSatisfiable",
    417: "ExpectationFailed",
    418: "ImATeapot",
    421: "MisdirectedRequest",
    422: "UnprocessableEntity",
    423: "Locked",
    424: "FailedDependency",
    425: "UnorderedCollection",
    426: "UpgradeRequired",
    428: "PreconditionRequired",
    429: "TooManyRequests",
    431: "RequestHeaderFieldsTooLarge",
    451: "UnavailableForLegalReasons",
    500: "InternalServerError",
    501: "NotImplemented",
    502: "BadGateway",
    503: "ServiceUnavailable",
    504: "GatewayTimeout",
    505: "HTTPVersionNotSupported",
    506: "VariantAlsoNegotiates",
    507: "InsufficientStorage",
    508: "LoopDetected",
    509: "BandwidthLimitExceeded",
    510: "NotExtended",
    511: "NetworkAuthenticationRequire",
  };
  if (errorMap[status]) {
    return { ...fail, message: errorMap[status] };
  }
  return success;
};

type JsonData = {
  success: boolean;
  message: string;
  data: any;
};

export const jsonData = (res: any, data: any = {}, status = 200): void => {
  const response: JsonData = {
    success: statusRes(status).status,
    message: statusRes(status).message,
    data,
  };
  res.status(status).json(response);
};

export const response = async (res: any, cb: any): Promise<void> => {
  try {
    const { data, status } = await cb();
    jsonData(res, data, status);
  } catch (err) {
    jsonData(res, err, 500);
  }
};

export default {
  statusRes,
  jsonData,
  response,
};
