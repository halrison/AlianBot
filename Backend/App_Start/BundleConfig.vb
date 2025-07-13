Imports System.Web
Imports System.Web.Optimization

Public Module BundleConfig
  ' 如需統合的詳細資訊，請瀏覽 https://go.microsoft.com/fwlink/?LinkId=301862
  Public Sub RegisterBundles(ByVal bundles As BundleCollection)
    'bundles.Add(New ScriptBundle("~/bundles/jquery").Include(
    '           "~/Scripts/jquery-{version}.js"))

    ' 使用開發版本的 Modernizr 進行開發並學習。然後，當您
    ' 準備好可進行生產時，請使用 https://modernizr.com 的建置工具，只挑選您需要的測試。
    'bundles.Add(New ScriptBundle("~/bundles/modernizr").Include(
    '            "~/Scripts/modernizr-*"))

    'bundles.Add(New Bundle("~/bundles/bootstrap").Include(
    '            "~/Scripts/bootstrap.js"))

    'bundles.Add(New StyleBundle("~/Content/css").Include(
    '            "~/Content/bootstrap.css",
    '            "~/Content/site.css"))
  End Sub
End Module