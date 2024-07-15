<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>@ViewBag.Title - 我的 ASP.NET 應用程式</title>
    @Styles.Render("~/Content/Site.css")
</head>
<body>
    <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark">
        <div class="container">
            @Html.ActionLink("應用程式名稱", "Index", "Home", New With { .area = "" }, New With { .class = "navbar-brand" })
            <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" title="切換導覽" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse d-sm-inline-flex justify-content-between">
                <ul class="navbar-nav flex-grow-1">
                    <li>@Html.ActionLink("首頁", "Index", "Home", New With { .area = "" }, New With { .class = "nav-link" })</li>
                    <li>@Html.ActionLink("API", "Index", "Help", New With { .area = "" }, New With { .class = "nav-link" })</li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container body-content">
        @RenderBody()
        <hr />
        <footer>
            <p>&copy; @DateTime.Now.Year - 我的 ASP.NET 應用程式</p>
        </footer>
    </div>

    @RenderSection("scripts", required:=False)
</body>
</html>
