package com.api.teamfresh.entity;

import com.api.teamfresh.dto.CompensationDto;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

/**
 * Compensation 엔티티: 배상에 관련된 정보를 저장합니다.
 */
@Data
@Entity
public class Compensation {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name = "voc_id")
  private VOC voc;

  private String compensationInfo;   // 해당 필드를 담당자와 , 택배사 정보로 변경
  private int compensationAmount;

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

  public CompensationDto toDto() {
    CompensationDto dto = new CompensationDto();
    dto.setId(this.id);
    dto.setCompensationInfo(this.compensationInfo);
    dto.setCompensationAmount(this.compensationAmount);
    dto.setCreationDate(this.creationDate);
    dto.setUpdateDate(this.updateDate);
    return dto;
  }

  public void setVoc(VOC voc) {
    this.voc = voc;
  }

}