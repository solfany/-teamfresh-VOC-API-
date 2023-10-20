package com.api.teamfresh.entity;

import com.api.teamfresh.dto.ObjectionDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

// Objection 엔티티: VOC와 관련된 이의 제기 정보를 관리하는 엔티티
@Data
@Entity
public class Objection {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id; // 이의 제기의 고유한 ID

  private String managerCode; // 관리자 코드. 해당 이의 제기를 관리하는 담당자 코드


  private Boolean objectionStatus; // 이의 제기 여부. true일 경우 이의가 제기된 것이며, false는 제기되지 않았음을 나타냄

  private String objectionContent; // 이의 제기의 상세 내용

  private String progressStatus; // 이의 제기의 진행 상태 (예: 처리중, 완료 등)

  private String process; // 이의 제기에 대한 처리 과정 및 내용

  @Temporal(TemporalType.DATE)
  private Date creationDate; // 이의 제기가 생성된 날짜

  @Temporal(TemporalType.DATE)
  private Date updateDate; // 이의 제기 정보가 마지막으로 업데이트된 날짜


  // Objection 엔티티
  @OneToOne(mappedBy = "objection")
  @JsonIgnore
  private VOC voc; // 해당 이의 제기 정보와 연결된 VOC

  public ObjectionDto toDto() {
    ObjectionDto dto = new ObjectionDto();
    dto.setId(this.id);
    dto.setManagerCode(this.managerCode);
    dto.setObjectionStatus(this.objectionStatus);
    dto.setObjectionContent(this.objectionContent);
    dto.setProgressStatus(this.progressStatus);
    dto.setProcess(this.process);
    dto.setCreationDate(this.creationDate);
    dto.setUpdateDate(this.updateDate);
//     dto.setVoc(this.voc.toDto()); // 필요하면 추가로
    return new ObjectionDto(this);
  }

  public void setVoc(VOC voc) {
    if (this.voc != null) {
      this.voc.setObjection(null);
    }
    this.voc = voc;
    if (voc != null) {
      voc.setObjection(this);
    }
  }
  @PrePersist
  protected void onCreate() {
    creationDate = new Date();
    updateDate = creationDate;  // Optionally set updateDate on creation too.
    if (progressStatus == null) {
      progressStatus = "처리중";
    }
    if (objectionStatus == null) {
      objectionStatus = true;
    }}

  @PreUpdate
  protected void onUpdate() {
    updateDate = new Date();
  }
}

