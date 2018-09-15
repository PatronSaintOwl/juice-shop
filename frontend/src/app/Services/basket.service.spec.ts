import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing'

import { BasketService } from './basket.service'

describe('BasketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BasketService]
    })
  })

  it('should be created', inject([BasketService], (service: BasketService) => {
    expect(service).toBeTruthy()
  }))

  it('should get basket directly from the rest api', inject([BasketService, HttpTestingController],
    fakeAsync((service: BasketService, httpMock: HttpTestingController) => {
      let res
      service.find(1).subscribe((data) => res = data)
      const req = httpMock.expectOne('http://localhost:3000/rest/basket/1')
      req.flush({ data: 'apiResponse' })
      tick()
      expect(req.request.method).toBe('GET')
      expect(res).toBe('apiResponse')
      httpMock.verify()
    })
  ))

  it('should get single basket item directly from the rest api', inject([BasketService, HttpTestingController],
    fakeAsync((service: BasketService, httpMock: HttpTestingController) => {
      let res
      service.get(1).subscribe((data) => res = data)
      const req = httpMock.expectOne('http://localhost:3000/api/BasketItems/1')
      req.flush({ data: 'apiResponse' })
      tick()
      expect(req.request.method).toBe('GET')
      expect(res).toBe('apiResponse')
      httpMock.verify()
    })
  ))

  it('should create basket item directly from the rest api', inject([BasketService, HttpTestingController],
    fakeAsync((service: BasketService, httpMock: HttpTestingController) => {
      let res
      service.save().subscribe((data) => res = data)
      const req = httpMock.expectOne('http://localhost:3000/api/BasketItems/')
      req.flush({ data: 'apiResponse' })
      tick()
      expect(req.request.method).toBe('POST')
      expect(res).toBe('apiResponse')
      httpMock.verify()
    })
  ))

  it('should update basket item directly from the rest api', inject([BasketService, HttpTestingController],
    fakeAsync((service: BasketService, httpMock: HttpTestingController) => {
      let res
      service.put(1,{}).subscribe((data) => res = data)
      const req = httpMock.expectOne('http://localhost:3000/api/BasketItems/1')
      req.flush({ data: 'apiResponse' })
      tick()
      expect(req.request.method).toBe('PUT')
      expect(res).toBe('apiResponse')
      httpMock.verify()
    })
  ))

  it('should delete basket item directly from the rest api', inject([BasketService, HttpTestingController],
    fakeAsync((service: BasketService, httpMock: HttpTestingController) => {
      let res
      service.del(1).subscribe((data) => res = data)
      const req = httpMock.expectOne('http://localhost:3000/api/BasketItems/1')
      req.flush({ data: 'apiResponse' })
      tick()
      expect(req.request.method).toBe('DELETE')
      expect(res).toBe('apiResponse')
      httpMock.verify()
    })
  ))

  it('should place order for basket via the rest api', inject([BasketService, HttpTestingController],
    fakeAsync((service: BasketService, httpMock: HttpTestingController) => {
      let res
      service.checkout(1).subscribe((data) => res = data)
      const req = httpMock.expectOne('http://localhost:3000/rest/basket/1/checkout')
      req.flush({ orderConfirmation: 'apiResponse' })
      tick()
      expect(req.request.method).toBe('POST')
      expect(res).toBe('apiResponse')
      httpMock.verify()
    })
  ))

  it('should apply coupon to basket via the rest api', inject([BasketService, HttpTestingController],
    fakeAsync((service: BasketService, httpMock: HttpTestingController) => {
      let res
      service.applyCoupon(1,'1234567890').subscribe((data) => res = data)
      const req = httpMock.expectOne('http://localhost:3000/rest/basket/1/coupon/1234567890')
      req.flush({ discount: 'apiResponse' })
      tick()
      expect(req.request.method).toBe('PUT')
      expect(res).toBe('apiResponse')
      httpMock.verify()
    })
  ))
})