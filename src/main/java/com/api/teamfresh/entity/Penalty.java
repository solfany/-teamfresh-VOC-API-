package com.api.teamfresh.entity;

import com.api.teamfresh.dto.PenaltyDto;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Penalty {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "compensation_id")
  private Compensation compensation;

  @OneToOne
  @JoinColumn(name = "voc_id")

  private VOC voc;

  private String managerCode;
  private String penaltyContent;

  @Temporal(TemporalType.DATE)
  private Date creationDate;

  @Temporal(TemporalType.DATE)
  private Date updateDate;

  @PrePersist
  protected void onCreate() {
    creationDate = new Date();
  }

  @PreUpdate
  protected void onUpdate() {
    updateDate = new Date();
  }

  public PenaltyDto toDto() {
    PenaltyDto dto = new PenaltyDto();
    dto.setId(this.id);
    dto.setManagerCode(this.managerCode);
    dto.setPenaltyContent(this.penaltyContent);
    dto.setCreationDate(this.creationDate);
    dto.setUpdateDate(this.updateDate);
    return dto;
  }

  public void setCompensation(Compensation compensation) {
    this.compensation = compensation;
  }

  public void setVoc(VOC voc) {
    this.voc = voc;
  }


}