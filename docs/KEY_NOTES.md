# Qiibee Challenge
Qiibee Take-Home Coding Challenge

- [Back to main README](../README.md)

## Key Notes

#### Usage of AI
- AI used: Co Pilot, ChatGPT. Mainly for unit testing and simple functionality.

#### UI
- I used React Native with Expo so the dashboard supports all platforms.
- The `qb/rnui` packages provides Metrial-UI style components under the hood.
- Tailwind doesn't work with React Native, so I did not use it. I thought the demonstration of an all-platform code base was more powerful.
- Most generic styles can be found in [GenericStyles](../packages/qb-app/qb-dashboard-ui/src/types/GenericStyles.tsx).

#### Known Issues
- When a modal is opened, it is disconnected from the root layout, and therefore has no access to contexts. To handle it, callbacks are passed on to components who live inside modals.
- A known navigation limitation is that when navigating to a new page within the same path (only changing the url params), this is not considered a new route. As a result, the previous route is lost (the one in the same path, with the previous url params). One possible solution would be to implement a simple navigation providers that keeps track of the stack, and provides a navigationTo() and back() methods.

#### Redux and RTK Query
- For data fetching and modeling, I saw no reason to use `createAsyncThunk` over letting RTK Query do the job instead. I did use it to fetch the inventory csv though.
- I used mocked GraphQL requests, without the actual graph, but with the handling of the specific way GraphQL returns errors.
- I used Redux store extraArgument to provide RTK query with runtime arguments; specifically, I wanted to avoid hard coding the API url in the client code, so I stored it in an .env file, then passed it down to the app as a variable.
- I used `Axios` for API fetching.

#### API Mock
- Used `msw` in browser.
- I used mocked GraphQL queries, in order to demonstrate how to handle GraphQL responses on the client.
- */product/graphql getProductSummariesPaginated query*: `MAX_PRODUCTS_PER_PAGE` defines the maximum allowed limit (I set it to 24). The client uses a limit of 12 as required.
- Since `msw` works in browser, and I wanted the dashboard to also work on mobile, I created `MockApiServer.ts` and `MockApiServer.web.ts`, where the non-web version of the mock does nothing. When RTK query / Redux Thunk send an API request via Axios, in case of mobile I bypassed the network and called the mocked API request handler directly.

#### Localization (`AppLocalizationProvider`)
- Use `i18next` for easy language control. Transltions are provided for each languages under `assets`.
- Mocked product DB is designed so that requests are provided with a `langCode` parameter, and the values returned for lingual fields (name, description, full description, specifications) are returned in the requested language code.
- Language selection is stored locally (browser or mobile).
- Language is intially set to the device location, then can be editted (currently English or French).
- Both translations and fetched data update automatically upon changing language - there is no need to reload.

#### Product Localization
- In order to have complete localization of products for user preferred language, those properties that carry text are stored in an object per supported language.
- Requests are provided with the user-selected language, and the corresponding object is returned (Base + Translations).
[ProductTypes](../packages/qb-app/qb-models/src/types/ProductTypes.ts)
```
export type ProductTranslatedValuesT = {
  langCode: QbLangCodeT,
  name: string,
  description: string,
  fullDescription: string,
  specifications?: Record<string, TranslatedProductSpecificationT>,
}

export type TranslatedProductSpecificationT = {
  specificationText: string,
  specificationValue: string | number,
}
```

#### Assumptions
- In product details page, it was required to show 'stock Info', as well as to add an action 'View inventory', which I wasn't sure what it meant, so I assumed it meant to add an action to go to the inventory page.
- When inventory filters is changed, all previous selected stock updates are cleared.
- When product update error - show error message, and clear the changes no matter what (Assuming they are invalid for some reason)

#### Error handling (`AppErrorHandlingProvider`)
- When an API requests returns an error code, the app displays a snackbar with the translated error message (and sets the correct state to continue with).
- Additionally, I placed an Error Boundary (`RnuiErrorBoundary`) to catch unexpected errors, in which case a simple predefined error page is displayed, with a link to go back to home page.

#### Sending parameters to the app
- The main Expo app passes parameters to the DashboardLayout component, who saves them in a context and makes them available. For example: `productsPerPage`.

#### Things I wanted to add but had no time
- Image resolutions: Ideally, each product would store images for different resolutions, then the client will pick a lower resolution for smaller screens (or smaller predefined heights).
- I would have added a bit more inline documentation.
