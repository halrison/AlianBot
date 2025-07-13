Imports System
Imports System.Collections.Generic
Imports System.Linq
Imports System.Web.Http

Public Module WebApiConfig
  Public Sub Register(ByVal config As HttpConfiguration)
    ' Web API 設定和服務

    ' Web API 路由
    config.MapHttpAttributeRoutes()

    config.Routes.MapHttpRoute(
        name:="DefaultApi",
        routeTemplate:="api/{controller}"
    )
  End Sub
End Module
