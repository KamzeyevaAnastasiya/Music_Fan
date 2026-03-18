import type { PlaylistData } from '@/features/playlists/api/playlistsApi.types'

type Props = {
  playlist: PlaylistData
  deletePlaylist: (playlistId: string) => void
  editPlaylist: (playlist: PlaylistData) => void
}

export const PlaylistItem = ({ playlist, editPlaylist, deletePlaylist }: Props) => {
  return (
    <div>
      <div>title: {playlist.attributes.title}</div>
      <button onClick={() => editPlaylist(playlist)}>update</button>
      <button onClick={() => deletePlaylist(playlist.id)}>delete</button>
    </div>
  )
}
