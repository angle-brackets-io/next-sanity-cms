import GTM from './GTM'
import Head, { IMeta } from './Head'

export default function MetaComponent({ meta }: { meta: IMeta }) {
  const { gtmID } = meta
  return (
    <>
      {gtmID && <GTM id={gtmID} />}
      <Head meta={meta} />
    </>
  )
}
