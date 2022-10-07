#running the code
- clone this repository
- run pnpm install (https://pnpm.io/)
- run pnpm start

#considerations

- I'm Using spotify API authorization for code flow https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
So, you need to login on your spotify account to use this application.
- Despite of the requirement to not use any third party libraries to make requests, I've used an angular library: HttpClient. It is the recommended for angular team. Otherwise I would have to make a workaround to use Observables properly. I could use javascript fetch, but It's not the best solution with angular.
- For caching I've used httpInterceptor to check if a GET request has already been done. If not, make the request and save on localStorage. Otherwise read from localStorage and return the request result.
- For Error handling I've used httpInterceptor to check if some request returned 401, in this case the user token has been expired, then they need to login again. Also, I'm checking for 429 result. In this case I show an alert to user, and start a counter with 30 seconds. New requests will be only made after this 30 seconds.
- In case of token expiration, all localStorage data is cleared.