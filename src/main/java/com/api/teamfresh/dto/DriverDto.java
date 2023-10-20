package com.api.teamfresh.dto;

import com.api.teamfresh.entity.Driver;
import lombok.Data;

import java.util.Date;
@Data
public class DriverDto {

  private Long id;
  private Long carrierId;  // Storing Carrier's id instead of the entire object.
  private String driverCode;
  private String driverType;
  private String phoneNum;
  private Date creationDate;
  private Date updateDate;
  private int penaltyCount;

  public Driver toEntity() {
    Driver driver = new Driver();
    driver.setId(this.id);
    driver.setDriverCode(this.driverCode);
    driver.setDriverType(this.driverType);
    driver.setPhoneNum(this.phoneNum);
    driver.setCreationDate(this.creationDate);
    driver.setUpdateDate(this.updateDate);
    driver.setPenaltyCount(this.penaltyCount);
    return driver;
  }
}
