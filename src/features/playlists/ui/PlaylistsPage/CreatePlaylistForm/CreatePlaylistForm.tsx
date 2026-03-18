import { useCreatePlaylistMutation } from '@/features/playlists/api/playlistsApi'
import type { CreatePlaylistArgs } from '@/features/playlists/api/playlistsApi.types'
import { type SubmitHandler, useForm } from 'react-hook-form'

export const CreatePlaylistForm = () => {
  const { register, handleSubmit, reset } = useForm<CreatePlaylistArgs>()
  const [createPlaylist] = useCreatePlaylistMutation()

  const onSubmit: SubmitHandler<CreatePlaylistArgs> = (data) => {
    const payload: CreatePlaylistArgs = {
      data: {
        type: 'playlists',
        attributes: data.data.attributes,
      },
    }
    createPlaylist(payload)
      .unwrap()
      .then(() => {
        reset()
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new playlist</h2>
      <div>
        <input {...register('data.attributes.title')} placeholder={'title'} />
      </div>
      <div>
        <input {...register('data.attributes.description')} placeholder={'description'} />
      </div>
      <button>create playlist</button>
    </form>
  )
}
