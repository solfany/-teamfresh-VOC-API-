package com.api.teamfresh.service;

import com.api.teamfresh.Repository.CarrierRepository;
import com.api.teamfresh.Repository.DriverRepository;
import com.api.teamfresh.entity.Driver;
import com.api.teamfresh.entity.Carrier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DriverService {

  @Autowired
  private DriverRepository driverRepository;

  @Autowired
  private CarrierRepository carrierRepository;

  @Transactional
  public Driver saveOrUpdateDriver(Driver driver) {
    if (driver.getCarrier() != null && driver.getCarrier().getId() != null) {
      Carrier carrier = carrierRepository.findById(driver.getCarrier().getId()).orElse(null);
      if (carrier != null) {
        driver.setCarrier(carrier);
      } else {
        throw new RuntimeException("Carrier with ID " + driver.getCarrier().getId() + " not found.");
      }
    }
    return driverRepository.save(driver);
  }
}
