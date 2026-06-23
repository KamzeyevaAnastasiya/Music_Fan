import { useGetMeQuery } from '@/features/auth/api/authApi'
import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi'
import { CreatePlaylistForm } from '@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm'
import { PlaylistsList } from '@/features/playlists/ui/PlaylistsPage/PlaylistsList/PlaylistsList'
import s from './ProfilePage.module.css'

export const ProfilePage = () => {
  const { data: meResponse } = useGetMeQuery()

  const { data: PlaylistsResponse, isLoading } = useFetchPlaylistsQuery({
    userId: meResponse?.userId,
  })

  return (
    <div>
      <h1>{meResponse?.login} page</h1>
      <div className={s.container}>
        <CreatePlaylistForm />
        <PlaylistsList playlists={PlaylistsResponse?.data || []} isPlaylistsLoading={isLoading} />
      </div>
    </div>
  )
}
