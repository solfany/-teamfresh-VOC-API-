package com.api.teamfresh.Repository;

import com.api.teamfresh.entity.Objection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ObjectionRepository extends JpaRepository<Objection, Long> {
}
