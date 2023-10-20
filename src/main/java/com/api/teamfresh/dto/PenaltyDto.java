package com.api.teamfresh.dto;

import com.api.teamfresh.entity.Compensation;
import com.api.teamfresh.entity.Penalty;
import com.api.teamfresh.entity.VOC;
import lombok.Data;

import java.util.Date;

@Data
public class PenaltyDto {

  private Long id;
  private Long compensationId;
  private Long vocId;
  private String managerCode;
  private String penaltyContent;
  private Date creationDate;
  private Date updateDate;

  public Penalty toEntity() {
    Penalty penalty = new Penalty();
    penalty.setManagerCode(this.managerCode);
    penalty.setPenaltyContent(this.penaltyContent);

    if(this.vocId != null) {
      VOC voc = new VOC();
      voc.setId(this.vocId);
      penalty.setVoc(voc);
    }

    if(this.compensationId != null) {
      Compensation compensation = new Compensation();
      compensation.setId(this.compensationId);
      penalty.setCompensation(compensation);
    }

    penalty.setId(this.id);
    penalty.setCreationDate(this.creationDate);
    penalty.setUpdateDate(this.updateDate);

    return penalty;
  }
}