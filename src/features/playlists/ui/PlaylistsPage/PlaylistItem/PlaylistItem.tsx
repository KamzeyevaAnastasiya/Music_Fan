import type { PlaylistData } from '@/features/playlists/api/playlistsApi.types'
import { PlaylistCover } from '@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistCover/PlaylistCover'
import { PlaylistDescription } from '@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistDescription/PlaylistDescription'

type Props = {
  playlist: PlaylistData
  deletePlaylist: (playlistId: string) => void
  editPlaylist: (playlist: PlaylistData) => void
}

export const PlaylistItem = ({ playlist, editPlaylist, deletePlaylist }: Props) => {
  return (
    <div>
      <PlaylistCover playlistId={playlist.id} images={playlist.attributes.images} />
      <PlaylistDescription attributes={playlist.attributes} />
      <button onClick={() => editPlaylist(playlist)}>update</button>
      <button onClick={() => deletePlaylist(playlist.id)}>delete</button>
    </div>
  )
}
