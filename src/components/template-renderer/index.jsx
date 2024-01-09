import dynamic from 'next/dynamic';
import ModuleRenderer from '~/components/module-renderer'
const PostPreview = dynamic(() => import('~/components/Post/PostPreview'))
import Post from '~/components/Post'
import { useLiveQuery } from 'next-sanity/preview'
import { groq } from 'next-sanity'
import { fragment as modulesFragment } from '~/components/module-renderer'

export default function TemplateRenderer(props) {


const pageQuery = (slug) => groq`
  *[_type == "page" && slug.current == '${slug}'] {
    _type,
    "title": title,
    "slug": slug.current,
    ${modulesFragment}
  }
`
const postQuery = (slug) => groq`
  *[_type == "post" && slug.current == '${slug}'][0]
`
switch (props.page?._type) {

  case "page":
    const [page] = useLiveQuery(props.page, pageQuery(props.slug))
    const {modules} = page[0] || {}
    
    return (
      <>
        {modules?.length > 0 && 
         <ModuleRenderer modules={modules} />
        }
      </>
    );
  case "post":

    const [postPage] = useLiveQuery(props.page, postQuery(props.slug))
    return (
      <>       
    <Post post={postPage} />
      </>
    );
 

  default:
    return null;
}
  

}

