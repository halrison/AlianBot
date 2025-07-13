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
  Public Class SongController
    Inherits System.Web.Http.ApiController

    Private db As New AlianbotEntities

    ' GET: api/Song
    Function GetSong() As IQueryable(Of Song)
      Return db.Song
    End Function

    ' GET: api/Song/5
    <ResponseType(GetType(Song))>
    Function GetSong(ByVal id As Integer) As IHttpActionResult
      Dim song As Song = db.Song.Find(id)
      If IsNothing(song) Then
        Return NotFound()
      End If

      Return Ok(song)
    End Function

    ' PUT: api/Song/5
    <ResponseType(GetType(Void))>
    Function PutSong(ByVal id As Integer, ByVal song As Song) As IHttpActionResult
      If Not ModelState.IsValid Then
        Return BadRequest(ModelState)
      End If

      If Not id = song.id Then
        Return BadRequest()
      End If

      db.Entry(song).State = Entity.EntityState.Modified

      Try
        db.SaveChanges()
      Catch ex As DbUpdateConcurrencyException
        If Not (SongExists(id)) Then
          Return NotFound()
        Else
          Throw
        End If
      End Try

      Return StatusCode(HttpStatusCode.NoContent)
    End Function

    ' POST: api/Song
    <ResponseType(GetType(Song))>
    Function PostSong(ByVal song As Song) As IHttpActionResult
      If Not ModelState.IsValid Then
        Return BadRequest(ModelState)
      End If

      db.Song.Add(song)
      db.SaveChanges()

      Return CreatedAtRoute("DefaultApi", New With {.id = song.id}, song)
    End Function

    ' DELETE: api/Song/5
    <ResponseType(GetType(Song))>
    Function DeleteSong(ByVal id As Integer) As IHttpActionResult
      Dim song As Song = db.Song.Find(id)
      If IsNothing(song) Then
        Return NotFound()
      End If

      db.Song.Remove(song)
      db.SaveChanges()

      Return Ok(song)
    End Function

    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
      If (disposing) Then
        db.Dispose()
      End If
      MyBase.Dispose(disposing)
    End Sub

    Private Function SongExists(ByVal id As Integer) As Boolean
      Return db.Song.Count(Function(e) e.id = id) > 0
    End Function
  End Class
End Namespace