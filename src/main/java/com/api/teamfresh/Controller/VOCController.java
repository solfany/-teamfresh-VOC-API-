package com.api.teamfresh.Controller;

import com.api.teamfresh.Service.VOCService;
import com.api.teamfresh.entity.VOC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/voc")
public class VOCController {
    private final VOCService vocService;

    @Autowired
    public VOCController(VOCService vocService) {
        this.vocService = vocService;
    }

    @GetMapping
    public List<VOC> listVOCs() {
        return vocService.getAllVOCs();
    }

    @PostMapping
    public VOC createVOC(@RequestBody VOC voc) {
        return vocService.createVOC(voc);
    }

    // 패널티, 배상에 대한 CRUD 등 다른 엔드포인트도 추가...
}
