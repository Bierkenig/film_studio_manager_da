import HelloWorld from "@/components/HelloWorld";
import bennI from "@/components/bennI";

export default [
    { path: '/bennI', name: 'bennI', component: bennI, props: false },
    { path: '*', name: 'start', component: HelloWorld },
]