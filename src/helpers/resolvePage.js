import React from 'react'
import * as pagesIdentifier from '../constants/page'
import LoadingPage from '../pages/LoadingPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import RegisterPage from '../pages/RegisterPage.jsx'
import HomePage from '../pages/HomePage.jsx'
import EditPage from '../pages/EditPage.jsx'
import CurrentPageContext from '../contexts/CurrentPageContext'
import EditContext from '../contexts/EditContext'

export default function (currentPage, appState) {
  switch (currentPage) {
    case pagesIdentifier.LOADING_PAGE_IDENTIFIER:
      return <LoadingPage user={appState.user} currentPage={appState.currentPage} websocket={appState.websocket} />
    case pagesIdentifier.LOGIN_PAGE_IDENTIFIER:
      return (
        <CurrentPageContext.Provider value={appState.currentPage}>
          <LoginPage
            user={appState.user}
            categories={appState.categories}
            bindings={appState.bindings}
            currentPage={appState.currentPage}
            websocket={appState.websocket} />
        </CurrentPageContext.Provider>
      )
    case pagesIdentifier.REGISTER_PAGE_IDENTIFIER:
      return (
        <CurrentPageContext.Provider value={appState.currentPage}>
          <RegisterPage
            user={appState.user}
            categories={appState.categories}
            bindings={appState.bindings}
            currentPage={appState.currentPage}
            websocket={appState.websocket} />
        </CurrentPageContext.Provider>
      )
    // case pagesIdentifier.RESET_PASSWORD_PAGE_IDENTIFIER:
    //   return <div />
    case pagesIdentifier.HOME_PAGE_IDENTIFIER:
      return (
        <CurrentPageContext.Provider value={appState.currentPage}>
          <HomePage user={appState.user} />
        </CurrentPageContext.Provider>
      )
    case pagesIdentifier.EDIT_PAGE_IDENTIFIER:
      return (
        <EditContext.Provider value={{
          user: appState.user,
          categories: appState.categories,
          bindings: appState.bindings
        }}>
          <CurrentPageContext.Provider value={appState.currentPage}>
            <EditPage />
          </CurrentPageContext.Provider>
        </EditContext.Provider>
      )
    case pagesIdentifier.STREAM_PAGE_IDENTIFIER:
      return <div>Mode stream</div>
    default:
      return null
  }
}
