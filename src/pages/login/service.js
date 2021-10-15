import httpRequest from '../../utils/http';

 export const demo = (data) => {
   return httpRequest.get("",data);
 };
