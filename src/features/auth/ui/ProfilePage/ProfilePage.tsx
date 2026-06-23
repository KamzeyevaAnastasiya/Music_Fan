import { useGetMeQuery } from '@/features/auth/api/authApi'
import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi'
import { PlaylistsList } from '@/features/playlists/ui/PlaylistsPage/PlaylistsList/PlaylistsList'

export const ProfilePage = () => {
  const { data: meResponse } = useGetMeQuery()

  const { data: PlaylistsResponse, isLoading } = useFetchPlaylistsQuery({
    userId: meResponse?.userId,
  })

  return (
    <div>
      <h1>{meResponse?.login} page</h1>
      <PlaylistsList playlists={PlaylistsResponse?.data || []} isPlaylistsLoading={isLoading} />
    </div>
  )
}
