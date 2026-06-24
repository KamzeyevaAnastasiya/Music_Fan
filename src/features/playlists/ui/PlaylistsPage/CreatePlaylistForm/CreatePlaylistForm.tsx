import { useCreatePlaylistMutation } from '@/features/playlists/api/playlistsApi'
import type { CreatePlaylistArgs } from '@/features/playlists/api/playlistsApi.types'
import { createPlaylistSchema } from '@/features/playlists/model/playlists.schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import s from './CreatePlaylistForm.module.css'

export const CreatePlaylistForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePlaylistArgs>({ resolver: zodResolver(createPlaylistSchema) })
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

  const titleError = errors.data?.attributes?.title?.message
  const descError = errors.data?.attributes?.description?.message

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new playlist</h2>
      <div>
        <input {...register('data.attributes.title')} placeholder={'title'} />
        {titleError && <span className={s.error}>{titleError}</span>}
      </div>
      <div>
        <input {...register('data.attributes.description')} placeholder={'description'} />
        {descError && <span className={s.error}>{descError}</span>}
      </div>
      <input type="hidden" {...register('data.type')} value="playlists" />
      <button>create playlist</button>
    </form>
  )
}
