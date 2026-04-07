import { useUploadPlaylistCoverMutation } from '@/features/playlists/api/playlistsApi'
import type { PlaylistData } from '@/features/playlists/api/playlistsApi.types'
import defaultCover from '@/assets/images/default-playlist-cover.png'
import type { ChangeEvent } from 'react'
import s from './PlaylistItem.module.css'

type Props = {
  playlist: PlaylistData
  deletePlaylist: (playlistId: string) => void
  editPlaylist: (playlist: PlaylistData) => void
}

export const PlaylistItem = ({ playlist, editPlaylist, deletePlaylist }: Props) => {
  const originalCover = playlist.attributes.images.main?.find((img) => img.type === 'original')
  const src = originalCover ? originalCover.url : defaultCover

  const [uploadPlaylistCover] = useUploadPlaylistCoverMutation()

  const uploadPlaylistCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const maxSize = 1024 * 1024 //1 MB

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']

    const file = event.target.files?.length && event.target.files[0]

    if (!file) return

    if (!allowedTypes.includes(file.type)) {
      alert('Only JPEG, PNG or GIF images are allowed')
      return
    }
    if (file.size > maxSize) {
      alert(`The file is too large. Max size is ${Math.round(maxSize / 1024)} KB`)
      return
    }

    uploadPlaylistCover({
      playlistId: playlist.id,
      file,
    })
  }

  return (
    <div>
      <img src={src} alt={'cover'} width="240px" className={s.cover} />
      <input type="file" accept={'image/jpeg,image/png,image/gif'} onChange={uploadPlaylistCoverHandler} />
      <div>title: {playlist.attributes.title}</div>
      <button onClick={() => editPlaylist(playlist)}>update</button>
      <button onClick={() => deletePlaylist(playlist.id)}>delete</button>
    </div>
  )
}
