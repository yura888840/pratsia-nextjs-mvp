import {siteOrigin} from '../common/seo.js';
export default function robots(){return {rules:{userAgent:'*',allow:'/',disallow:['/api/','/*?']},sitemap:siteOrigin()+'/sitemap.xml'};}
