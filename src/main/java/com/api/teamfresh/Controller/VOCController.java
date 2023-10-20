package com.api.teamfresh.Controller;

import com.api.teamfresh.Service.VOCService;
import com.api.teamfresh.dto.CompensationDto;
import com.api.teamfresh.dto.ObjectionDto;
import com.api.teamfresh.dto.PenaltyDto;
import com.api.teamfresh.dto.VOCDto;
import com.api.teamfresh.entity.Compensation;
import com.api.teamfresh.entity.ManagerType;
import com.api.teamfresh.entity.Penalty;
import com.api.teamfresh.entity.VOC;
import com.api.teamfresh.Repository.VOCRepository;
import com.api.teamfresh.Repository.CompensationRepository; // 추가
import com.api.teamfresh.Repository.PenaltyRepository; // 추가
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class VOCController {

  private final VOCService vocService;
  private static final Logger logger = LoggerFactory.getLogger(VOCController.class);

  @Autowired
  private VOCRepository vocRepository; // 추가

  @Autowired
  private CompensationRepository compensationRepository; // 추가

  @Autowired
  private PenaltyRepository penaltyRepository; // 추가

  @Autowired
  public VOCController(VOCService vocService) {
    this.vocService = vocService;
  }

  @GetMapping("/voc")
  public ResponseEntity<List<VOCDto>> getAllVOCs() {
    try {
      List<VOC> vocs = vocService.findAll();
      List<VOCDto> vocDtos = vocs.stream()
        .map(VOC::toDto)
        .collect(Collectors.toList());
      return ResponseEntity.ok(vocDtos);
    } catch (Exception e) {
      logger.error("Error fetching all VOCs", e);
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //클레임 목록
  @GetMapping("/voc/{managerType}")
  public ResponseEntity<List<VOCDto>> getAllVOCsByManagerType(@PathVariable ManagerType managerType) {
    try {
      logger.info("Fetching VOCs for managerType: " + managerType);  // 추가된 로그

      List<VOC> vocs = vocService.findAllWithJoinFetchByManagerType(managerType);
      logger.info("Successfully fetched " + vocs.size() + " VOCs.");  // 추가된 로그

      List<VOCDto> vocDtos = vocs.stream()
        .map(VOC::toDto)
        .collect(Collectors.toList());
      logger.info("Successfully transformed VOCs to DTOs.");  // 추가된 로그

      return ResponseEntity.ok(vocDtos);
    } catch (Exception e) {
      logger.error("Error fetching VOCs by managerType: " + managerType, e);
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  //클레임 목록 상세 페이지
  @GetMapping("/voc/DETAIL/{id}")
  public ResponseEntity<VOCDto> getVOCById(@PathVariable Long id) {
    try {
      VOC voc = vocService.findById(id);
      if (voc == null) {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
      }
      return ResponseEntity.ok(voc.toDto());
    } catch (Exception e) {
      logger.error("Error fetching VOC by id: " + id, e);
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 클레임 제출
  @PostMapping("/voc/submit-claim")
  public ResponseEntity<?> submitClaim(@RequestBody VOCDto vocDto) {
    try {
      vocService.submitClaim(vocDto);  // 수정된 코드

      return ResponseEntity.ok().body("Claim submitted successfully.");
    } catch (Exception e) {
      logger.error("Error submitting claim", e);
      return ResponseEntity.badRequest().body("Error submitting claim: " + e.getMessage());
    }
  }

  //  이의신청
  @PostMapping("/voc/objection")
  public ResponseEntity<?> addObjection(@RequestBody ObjectionDto.ObjectionRequest request) {
    try {
      ObjectionDto.VocResponseDto responseDto = vocService.addObjectionToVoc(request);
      return new ResponseEntity<>(responseDto, HttpStatus.OK);
    } catch (EntityNotFoundException ex) {
      return new ResponseEntity<>("VOC not found", HttpStatus.NOT_FOUND);
    } catch (Exception ex) {
      return new ResponseEntity<>("Error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // POST 요청을 통해 verificationStatus를 true로 변경하는 엔드포인트
  @PutMapping("/voc/verification/{vocId}")
  public ResponseEntity<?> updateVerificationStatus(@PathVariable Long vocId) {
    try {
      // vocId를 사용하여 해당 VOC의 verificationStatus를 true로 변경
      vocService.updateVerificationStatusToTrue(vocId);

      return ResponseEntity.ok("Verification status updated successfully.");
    } catch (Exception ex) {
      // 예외가 발생한 경우 500 Internal Server Error 반환
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
    }
  }
  @GetMapping("/voc/Compensation")
  public ResponseEntity<List<CompensationDto>> getCompensations() {
    List<CompensationDto> compensationDtos = vocService.getAllCompensations();
    return ResponseEntity.ok(compensationDtos);
  }
}




