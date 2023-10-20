package com.api.teamfresh.dto;

import com.api.teamfresh.entity.Carrier;
import com.api.teamfresh.entity.Driver;
import lombok.Data;

import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;
@Data
public class CarrierDto {

  private Long id;
  private String carrierType;
  private String carrierCode;
  private Date creationDate;
  private Date updateDate;
  private Set<DriverDto> drivers;

  public Carrier toEntity() {
    Carrier carrier = new Carrier();
    carrier.setId(this.id);
    carrier.setCarrierType(this.carrierType);
    carrier.setCarrierCode(this.carrierCode);
    carrier.setCreationDate(this.creationDate);
    carrier.setUpdateDate(this.updateDate);

    if (this.drivers != null) {
      Set<Driver> driverEntities = this.drivers.stream().map(DriverDto::toEntity).collect(Collectors.toSet());
      driverEntities.forEach(driver -> driver.setCarrier(carrier));  // Linking each driver to the carrier
      carrier.setDrivers(driverEntities);
    }


    return carrier;
  }
}
