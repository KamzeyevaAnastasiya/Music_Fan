import { PageSizeSelector } from '@/common/components/Pagination/PageSizeSelector/PageSizeSelector'
import { PaginationControls } from '@/common/components/Pagination/PaginationControls/PaginationControls'
import s from './Pagination.module.css'

type Props = {
  currentPage: number
  setCurrentPage: (page: number) => void
  pagesCount: number
  pageSize: number
  changePageSize: (size: number) => void
}

export const Pagination = ({ currentPage, setCurrentPage, pagesCount, pageSize, changePageSize }: Props) => {
  return (
    <div className={s.container}>
      <PaginationControls currentPage={currentPage} setCurrentPage={setCurrentPage} pagesCount={pagesCount} />
      <PageSizeSelector pageSize={pageSize} changePageSize={changePageSize} />
    </div>
  )
}
