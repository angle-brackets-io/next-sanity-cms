import { groq } from "next-sanity";

export const fragment = groq`
 page->{
   ...
   }  
`

export default function Button(props) {
  
  return <div>button</div>

}
