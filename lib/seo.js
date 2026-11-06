
import { catalogValue, translate } from "../i18n/index.js";
export function siteOrigin(){return (process.env.PRATSIA_ORIGIN||'http://localhost:3000').replace(/\/$/,'');}
export function isPublicJob(job){return job.status==='active'&&job.moderationStatus==='approved'&&Date.parse(job.expiresAt)>Date.now();}
export function jobPosting(job){
 const remote=job.arrangement===catalogValue("catalog.remote");
 return {'@context':'https://schema.org','@type':'JobPosting',title:job.title,description:[job.description,job.requirements,job.benefits].filter(Boolean).join('\n\n'),datePosted:job.createdAt,validThrough:job.expiresAt,hiringOrganization:{'@type':'Organization',name:job.company},identifier:{'@type':'PropertyValue',name:translate("brand.name"),value:job.id},url:siteOrigin()+'/jobs/'+job.id,...(remote?{jobLocationType:'TELECOMMUTE',applicantLocationRequirements:{'@type':'Country',name:'Ukraine'}}:{jobLocation:{'@type':'Place',address:{'@type':'PostalAddress',addressLocality:job.city,addressCountry:'UA'}}}),...(job.salaryMin>0?{baseSalary:{'@type':'MonetaryAmount',currency:job.currency,value:{'@type':'QuantitativeValue',minValue:job.salaryMin,maxValue:job.salaryMax,unitText:'MONTH'}}}:{})};
}
