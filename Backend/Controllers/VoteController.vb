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
  Public Class VoteController
    Inherits System.Web.Http.ApiController

    Private db As New AlianbotEntities

    ' GET: api/Vote
    Function GetVote() As IQueryable(Of Vote)
      Return db.Vote
    End Function

    ' GET: api/Vote/5
    <ResponseType(GetType(Vote))>
    Function GetVote(ByVal id As Integer) As IHttpActionResult
      Dim vote As Vote = db.Vote.Find(id)
      If IsNothing(vote) Then
        Return NotFound()
      End If

      Return Ok(vote)
    End Function

    ' PUT: api/Vote/5
    <ResponseType(GetType(Void))>
    Function PutVote(ByVal id As Integer, ByVal vote As Vote) As IHttpActionResult
      If Not ModelState.IsValid Then
        Return BadRequest(ModelState)
      End If

      If Not id = vote.id Then
        Return BadRequest()
      End If

      db.Entry(vote).State = Entity.EntityState.Modified

      Try
        db.SaveChanges()
      Catch ex As DbUpdateConcurrencyException
        If Not (VoteExists(id)) Then
          Return NotFound()
        Else
          Throw
        End If
      End Try

      Return StatusCode(HttpStatusCode.NoContent)
    End Function

    ' POST: api/Vote
    <ResponseType(GetType(Vote))>
    Function PostVote(ByVal vote As Vote) As IHttpActionResult
      If Not ModelState.IsValid Then
        Return BadRequest(ModelState)
      End If

      db.Vote.Add(vote)

      Try
        db.SaveChanges()
      Catch ex As DbUpdateException
        If (VoteExists(vote.id)) Then
          Return Conflict()
        Else
          Throw
        End If
      End Try

      Return CreatedAtRoute("DefaultApi", New With {.id = vote.id}, vote)
    End Function

    ' DELETE: api/Vote/5
    <ResponseType(GetType(Vote))>
    Function DeleteVote(ByVal id As Integer) As IHttpActionResult
      Dim vote As Vote = db.Vote.Find(id)
      If IsNothing(vote) Then
        Return NotFound()
      End If

      db.Vote.Remove(vote)
      db.SaveChanges()

      Return Ok(vote)
    End Function

    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
      If (disposing) Then
        db.Dispose()
      End If
      MyBase.Dispose(disposing)
    End Sub

    Private Function VoteExists(ByVal id As Integer) As Boolean
      Return db.Vote.Count(Function(e) e.id = id) > 0
    End Function
  End Class
End Namespace