Imports System.Data
Imports System.Data.Entity
Imports System.Data.Entity.Infrastructure
Imports System.Linq
Imports System.Net
Imports System.Net.Http
Imports System.Web.Http
Imports System.Web.Http.Description
Imports backend3

Namespace Controllers
  Public Class MemberController
    Inherits System.Web.Http.ApiController

    Private db As New AlianbotEntities

    ' GET: api/Member
    Function GetMember() As IQueryable(Of Member)
      Return db.Member
    End Function

    ' GET: api/Member/5
    <ResponseType(GetType(Member))>
    Function GetMember(ByVal id As Integer) As IHttpActionResult
      Dim member As Member = db.Member.Find(id)
      If IsNothing(member) Then
        Return NotFound()
      End If

      Return Ok(member)
    End Function

    ' PUT: api/Member/5
    <ResponseType(GetType(Void))>
    Function PutMember(ByVal id As Integer, ByVal member As Member) As IHttpActionResult
      If Not ModelState.IsValid Then
        Return BadRequest(ModelState)
      End If

      If Not id = member.id Then
        Return BadRequest()
      End If

      db.Entry(member).State = Entity.EntityState.Modified

      Try
        db.SaveChanges()
      Catch ex As DbUpdateConcurrencyException
        If Not (MemberExists(id)) Then
          Return NotFound()
        Else
          Throw
        End If
      End Try

      Return StatusCode(HttpStatusCode.NoContent)
    End Function

    ' POST: api/Member
    <ResponseType(GetType(Member))>
    Function PostMember(ByVal member As Member) As IHttpActionResult
      If Not ModelState.IsValid Then
        Return BadRequest(ModelState)
      End If

      db.Member.Add(member)

      Try
        db.SaveChanges()
      Catch ex As DbUpdateException
        If (MemberExists(member.id)) Then
          Return Conflict()
        Else
          Throw
        End If
      End Try

      Return CreatedAtRoute("DefaultApi", New With {.id = member.id}, member)
    End Function

    ' DELETE: api/Member/5
    <ResponseType(GetType(Member))>
    Function DeleteMember(ByVal id As Integer) As IHttpActionResult
      Dim member As Member = db.Member.Find(id)
      If IsNothing(member) Then
        Return NotFound()
      End If

      db.Member.Remove(member)
      db.SaveChanges()

      Return Ok(member)
    End Function

    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
      If (disposing) Then
        db.Dispose()
      End If
      MyBase.Dispose(disposing)
    End Sub

    Private Function MemberExists(ByVal id As Integer) As Boolean
      Return db.Member.Count(Function(e) e.id = id) > 0
    End Function
  End Class
End Namespace