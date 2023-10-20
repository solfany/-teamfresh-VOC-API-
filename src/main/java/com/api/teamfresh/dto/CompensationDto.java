package com.api.teamfresh.dto;

import com.api.teamfresh.entity.Compensation;
import com.api.teamfresh.entity.VOC;
import lombok.Data;

import java.util.Date;

@Data
public class CompensationDto {

  private Long id;
  private Long vocId;
  private String compensationInfo;
  private int compensationAmount;
  private Date creationDate;
  private Date updateDate;
  private String driverType;
  private String carrierType;
  public Compensation toEntity() {
    Compensation compensation = new Compensation();
    compensation.setCompensationInfo(this.compensationInfo);
    compensation.setCompensationAmount(this.compensationAmount);

    if(this.vocId != null) {
      VOC voc = new VOC();
      voc.setId(this.vocId);
      compensation.setVoc(voc);
    }

    compensation.setId(this.id);
    compensation.setCreationDate(this.creationDate);
    compensation.setUpdateDate(this.updateDate);

    return compensation;
  }


}