import { isString, isArray, isObject } from './util';
const statusInformational: { [key: number]: string } = {
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',
};
const statusSuccessful: { [key: number]: string } = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'NoContent',
  205: 'ResetContent',
  206: 'PartialContent',
  207: 'Multi-Status',
  208: 'AlreadyReported',
  226: 'IMUsed',
};
const statusRedirection: { [key: number]: string } = {
  300: 'MultipleChoices',
  301: 'MovedPermanently',
  302: 'Found',
  303: 'SeeOther',
  304: 'NotModified',
  305: 'UseProxy',
  306: 'SwitchProxy',
  307: 'TemporaryRedirect',
  308: 'PermanentRedirect',
};
const StatusClientError: { [key: number]: string } = {
  400: 'BadRequest',
  401: 'Unauthorized',
  402: 'PaymentRequired',
  403: 'Forbidden',
  404: 'NotFound',
  405: 'MethodNotAllowed',
  406: 'NotAcceptable',
  407: 'ProxyAuthenticationRequired',
  408: 'RequestTimeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'LengthRequired',
  412: 'PreconditionFailed',
  413: 'PayloadTooLarge',
  414: 'URITooLong',
  415: 'UnsupportedMediaType',
  416: 'RangeNotSatisfiable',
  417: 'ExpectationFailed',
  418: 'ImATeapot',
  421: 'MisdirectedRequest',
  422: 'UnprocessableEntity',
  423: 'Locked',
  424: 'FailedDependency',
  425: 'UnorderedCollection',
  426: 'UpgradeRequired',
  428: 'PreconditionRequired',
  429: 'TooManyRequests',
  431: 'RequestHeaderFieldsTooLarge',
  451: 'UnavailableForLegalReasons',
  499: 'ClientClosedRequest',
};
const statusServerError: { [key: number]: string } = {
  500: 'InternalServerError',
  501: 'NotImplemented',
  502: 'BadGateway',
  503: 'ServiceUnavailable',
  504: 'GatewayTimeout',
  505: 'HTTPVersionNotSupported',
  506: 'VariantAlsoNegotiates',
  507: 'InsufficientStorage',
  508: 'LoopDetected',
  509: 'BandwidthLimitExceeded',
  510: 'NotExtended',
  511: 'NetworkAuthenticationRequire',
  599: 'NetworkConnectTimeoutError',
};

const statusHTTP = {
  ...statusInformational,
  ...statusSuccessful,
  ...statusRedirection,
  ...StatusClientError,
  ...statusServerError,
};

export const statusRes = (status: number) => {
  let response;
  if (status <= 102) {
    response = { success: true, message: statusInformational[status] };
  }
  if (status >= 103 && status <= 226) {
    response = { success: true, message: statusSuccessful[status] };
  }
  if (status >= 227 && status <= 308) {
    response = { success: true, message: statusRedirection[status] };
  }
  if (status >= 309 && status <= 499) {
    response = { success: true, message: StatusClientError[status] };
  }
  if (status >= 500 && status <= 599) {
    response = { success: true, message: statusServerError[status] };
  }
  return response;
};

export const response = (res: any, status = 200, data: any = null): void => {
  const jsonData = {
    ...statusRes(status),
    data,
  };
  if (!data) {
    delete jsonData['data'];
  }
  if (isString(data)) {
    jsonData.message = data;
  }
  if (isObject(data)) {
    data?.message && (jsonData.message = data?.message);
    const dataTemp = { ...data };
    delete dataTemp['message'];
    data?.data && (jsonData.data = { ...dataTemp });
  }
  if (isArray(data)) {
    const getErrorFirst = data?.filter((item) => item?.message)[0]?.message;
    jsonData.message = getErrorFirst;
  }
  res.status(status).json(jsonData);
  return;
};

export default {
  statusRes,
  response,
  statusHTTP,
};
