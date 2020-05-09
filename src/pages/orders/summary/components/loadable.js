import React from "react";
import Loadable from 'react-loadable';

 
 const LoadableComponent = Loadable({
  loader: () => import('./index'),
  loading(){
    return <div>拼命加載中~~··~~</div>
  } 
});

export default () => <LoadableComponent/>;