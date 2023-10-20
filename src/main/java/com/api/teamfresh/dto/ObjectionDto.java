package com.api.teamfresh.dto;

import com.api.teamfresh.entity.Objection;
import com.api.teamfresh.entity.VOC;
import lombok.Data;

import java.util.Date;

@Data
public class ObjectionDto {

  private Long id;
  private String managerCode;
  private Boolean objectionStatus;
  private String objectionContent;
  private String progressStatus;
  private String process;
  private Date creationDate;
  private Date updateDate;
  private Long vocId;  // Storing VOC's id instead of the entire object.


  public Objection toEntity(VOC voc) {  // VOC 엔터티를 인자로 받는다.
    Objection objection = new Objection();
    ObjectionDto dto = new ObjectionDto(objection);

    objection.setId(this.id);
    objection.setManagerCode(this.managerCode);
    objection.setObjectionStatus(this.objectionStatus);
    objection.setObjectionContent(this.objectionContent);
    objection.setProgressStatus(this.progressStatus);
    objection.setProcess(this.process);
    objection.setCreationDate(this.creationDate);
    objection.setUpdateDate(this.updateDate);
    objection.setVoc(voc);  // 추가: VOC 엔터티 설정

    return objection;
  }

  @Data
  public static class ObjectionRequest {
    private Long vocId;
    private String objectionContent;
    private String managerCode; // 귀책 담당자의 이름 포함 필드(신규)

    public Objection toEntity(VOC voc) {
      Objection objection = new Objection();
      objection.setObjectionContent(this.objectionContent);
      objection.setVoc(voc);  // Setting the associated VOC entity

      return objection;
    }
  }
  public ObjectionDto(Objection objection) {
    this.id = objection.getId();
    this.managerCode = objection.getManagerCode();
    this.objectionStatus = objection.getObjectionStatus();
    this.objectionContent = objection.getObjectionContent();
    this.progressStatus = objection.getProgressStatus();
    this.process = objection.getProcess();
    this.creationDate = objection.getCreationDate();
    this.updateDate = objection.getUpdateDate();
    if (objection.getVoc() != null) {
      this.vocId = objection.getVoc().getId();
    }
  }

  @Data
  public static class VocResponseDto {
    private Long id;
    private String content;
    private ObjectionDto objection;

    public VocResponseDto(Long id, String content, ObjectionDto objection) {
      this.id = id;
      this.content = content;
      this.objection = objection;
    }
  }
  public ObjectionDto() {
  }
}
