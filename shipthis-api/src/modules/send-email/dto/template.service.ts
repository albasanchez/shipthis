import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateService {
    
    public templateSendMessageRegister(){
        let template='<html style="box-sizing: border-box;font-family: sans-serif;line-height: 1.15;-webkit-text-size-adjust: 100%;-webkit-tap-highlight-color: transparent;">'
        template+='<head style="box-sizing: border-box;">';
        template+='<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous" style="box-sizing: border-box;">';
        template+='<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous" style="box-sizing: border-box;"></script>';
        template +='<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous" style="box-sizing: border-box;"></script>';
        template +='<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous" style="box-sizing: border-box;"></script>';
        template += '<style style="box-sizing: border-box;">'   
        template +='.bd-placeholder-img {';
        template += 'font-size: 1.125rem;' ;  
        template += 'text-anchor: middle;';
        template += ' -webkit-user-select: none;';
        template +='-webkit-user-select: none;';
        template +=' -moz-user-select: none;';
        template +='-ms-user-select: none;';
        template +='user-select: none;';
        template += ' }';
        template +='@media(min-width: 768px) {'
        template += '.bd-placeholder-img-lg {'
        template += 'font-size: 3.5rem;'
        template += '}';
        template += '}'; 
        template += '</style>';  
        template += '<title style="box-sizing: border-box;">ShipThis</title>';      
        template +='</head>';
        template += '<body style="box-sizing: border-box;margin: 0;font-family: -apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,&quot;Helvetica Neue&quot;,Arial,&quot;Noto Sans&quot;,sans-serif,&quot;Apple Color Emoji&quot;,&quot;Segoe UI Emoji&quot;,&quot;Segoe UI Symbol&quot;,&quot;Noto Color Emoji&quot;;font-size: 1rem;font-weight: 400;line-height: 1.5;color: #212529;text-align: left;background-color: #fff;min-width: 992px!important;"> <nav class="site-header sticky-top py-1" style="box-sizing: border-box;display: block;padding-top: .25rem!important;padding-bottom: .25rem!important;">';
        template += '<div class="container d-flex flex-column flex-md-row justify-content-between" style="box-sizing: border-box;width: 100%;padding-right: 15px;padding-left: 15px;margin-right: auto;margin-left: auto;min-width: 992px!important;display: flex!important;-ms-flex-direction: column!important;flex-direction: column!important;-ms-flex-pack: justify!important;justify-content: space-between!important;">   </div>';  
        template += '</nav>';
        template += '<img src="" alt="">';
        template += '<div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light" style="box-sizing: border-box;background-color: #f8f9fa!important;overflow: hidden!important;position: relative!important;padding: 3rem!important;margin: 1rem!important;text-align: center!important;">'
        template += '<div class="col-md-5 p-lg-5 mx-auto my-5" style="box-sizing: border-box;position: relative;width: 100%;padding-right: 15px;padding-left: 15px;-ms-flex: 0 0 41.666667%;flex: 0 0 41.666667%;max-width: 41.666667%;margin-top: 3rem!important;margin-bottom: 3rem!important;margin-right: auto!important;margin-left: auto!important;padding: 3rem!important;">'
        template += '<h1 class="font-weight-normal" style="box-sizing: border-box;margin-top: 0;margin-bottom: .5rem;font-weight: 400!important;line-height: 1.2;font-size: 2.5rem;">Thanks for registering on ShipThis</h1>'
        template += '<p class="lead font-weight-normal" style="box-sizing: border-box;margin-top: 0;margin-bottom: 1rem;orphans: 3;widows: 3;font-size: 1.25rem;font-weight: 400!important;">The best option to transport, distribute and deliver efficiently, the parcels of documents and merchandise throughout the national territory. Paying at the origin or destination, depending on your preference.</p>'
        template += '<a class="btn btn-outline-primary" href="www.google.com" style="box-sizing: border-box;color: #007bff;text-decoration: none;background-color: transparent;display: inline-block;font-weight: 400;text-align: center;vertical-align: middle;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;border: 1px solid transparent;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;border-radius: .25rem;transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;border-color: #007bff;">Coming soon</a>'
        template += '</div>'
        template += '<div class="product-device shadow-sm d-none d-md-block" style="box-sizing: border-box;display: block!important;box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;"></div>'
        template += '<div class="product-device product-device-2 shadow-sm d-none d-md-block" style="box-sizing: border-box;display: block!important;box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;"></div>'
        template += '</div>';
        template += '</body>';
        template += '</html>';
        return template;
    }

}