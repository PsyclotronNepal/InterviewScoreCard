<?php

/**
 * Created by Reliese Model.
 * Date: Sat, 02 Jun 2018 17:36:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class EvaluationCriterium
 *
 * @property int $id
 * @property string $title
 * @property string $weight
 * @property string $remarks
 * @property int $interview_id
 * 
 * @property \App\Models\Interview $interview
 * @property \App\Models\InterviewerHasInterview $interviewer_has_interview
 *
 * @package App\Models
 */
class EvaluationCriterium extends Eloquent
{
	public $timestamps = false;

	protected $casts = [
		'interview_id' => 'int'
	];

	protected $fillable = [
		'title',
		'weight',
		'remarks',
		'interview_id'
	];

	public function interview()
	{
		return $this->belongsTo(\App\Models\Interview::class);
	}

    public function interviewer_has_interview()
    {
        return $this->hasOne(\App\Models\InterviewerHasInterview::class, 'evaluation_id');
	}
}
