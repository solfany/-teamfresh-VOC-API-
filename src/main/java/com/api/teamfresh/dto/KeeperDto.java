package com.api.teamfresh.dto;

import lombok.Data;

import java.util.Date;

@Data
public class KeeperDto {

  private Long id;
  private Long customerId;  // Storing Customer's id instead of the entire object.
  private String managerCode;
  private String keeperName;
  private String phoneNum;
  private Date creationDate;
  private Date updateDate;
  private int penaltyCount;

}

